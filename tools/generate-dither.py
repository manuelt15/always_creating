"""
Dither ordenado (Bayer 8x8) a dos tintas para always creating.

Los assets se calculan una vez y se sirven como PNG: el navegador no gasta CPU
en tramar y el patron es identico en cualquier pantalla. El campo animado del
hero no sale de aqui, vive en components/DitherField.jsx.

Uso, desde la raiz del repo:

    python3 tools/generate-dither.py

Requiere Pillow. Lee las fotos originales de public/ y escribe en public/dither/.
"""
from pathlib import Path
import os
import random

from PIL import Image, ImageEnhance, ImageOps

RAIZ = Path(__file__).resolve().parents[1]
SALIDA = RAIZ / "public" / "dither"

FONDO = (0x0B, 0x0B, 0x0C)
TINTA = (0xEC, 0xE8, 0xE1)

# Matriz de Bayer 8x8 normalizada a 0..63
BAYER = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
]


def a_gris(im: Image.Image) -> Image.Image:
    return ImageOps.grayscale(im)


def dither(im: Image.Image, tinta=TINTA, fondo=FONDO, sesgo=0.0, invertir=False) -> Image.Image:
    """Devuelve la imagen en dos tintas con el patron de Bayer."""
    g = a_gris(im)
    w, h = g.size
    px = g.load()
    salida = Image.new("RGB", (w, h), fondo)
    out = salida.load()
    for y in range(h):
        fila = BAYER[y % 8]
        for x in range(w):
            v = px[x, y] / 255.0
            if invertir:
                v = 1.0 - v
            v = min(1.0, max(0.0, v + sesgo))
            umbral = (fila[x % 8] + 0.5) / 64.0
            if v > umbral:
                out[x, y] = tinta
    return salida


def recorte_retrato(im: Image.Image, aspecto=4 / 5) -> Image.Image:
    """Recorta centrado al aspecto pedido, sin deformar."""
    im = im.convert("RGB")
    w, h = im.size
    objetivo = aspecto
    if w / h > objetivo:
        nuevo_w = int(h * objetivo)
        x0 = (w - nuevo_w) // 2
        im = im.crop((x0, 0, x0 + nuevo_w, h))
    else:
        nuevo_h = int(w / objetivo)
        y0 = max(0, int((h - nuevo_h) * 0.35))  # algo mas de aire arriba
        im = im.crop((0, y0, w, y0 + nuevo_h))
    return im


def retrato(origen: Path, destino: Path, ancho: int, sesgo=0.06, contraste=1.15):
    im = Image.open(origen)
    im = recorte_retrato(im)
    alto = int(im.height * ancho / im.width)
    im = im.resize((ancho, alto), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(contraste)
    d = dither(im, sesgo=sesgo)
    d.save(destino, "PNG", optimize=True)
    return d.size


def degradado(destino: Path, w=1000, h=420, desde=0.0, hasta=1.0):
    """Bloque de degradado dithered, para fondos de seccion."""
    im = Image.new("L", (w, h))
    px = im.load()
    for y in range(h):
        v = desde + (hasta - desde) * (y / (h - 1))
        for x in range(w):
            px[x, y] = int(v * 255)
    d = dither(im, sesgo=0.0)
    d.save(destino, "PNG", optimize=True)
    return d.size


def grano(destino: Path, lado=256):
    """Textura sutil y repetible, para bordes y superficies."""
    random.seed(7)
    im = Image.new("L", (lado, lado))
    px = im.load()
    for y in range(lado):
        for x in range(lado):
            px[x, y] = int(255 * random.random())
    d = dither(im, sesgo=-0.12)
    d.save(destino, "PNG", optimize=True)
    return d.size


def main():
    os.makedirs(SALIDA, exist_ok=True)
    hechos = []

    # retratos: dos tamanos, uno para escritorio y otro para movil
    for nombre, origen in (
        ("manuel", RAIZ / "public" / "artists" / "manuel-torres.jpg"),
        ("moya", RAIZ / "public" / "moya.jpg"),
    ):
        if not origen.exists():
            print("falta:", origen)
            continue
        hechos.append((f"{nombre}-900.png", retrato(origen, SALIDA / f"{nombre}-900.png", 900)))
        hechos.append((f"{nombre}-480.png", retrato(origen, SALIDA / f"{nombre}-480.png", 480)))

    hechos.append(("degradado-lima.png", degradado(SALIDA / "degradado-lima.png")))
    hechos.append(("grano.png", grano(SALIDA / "grano.png")))

    for nombre, tam in hechos:
        ruta = SALIDA / nombre
        print(f"  {nombre:22} {tam[0]}x{tam[1]}  {os.path.getsize(ruta)//1024} KB")


if __name__ == "__main__":
    main()
