import subprocess
import os

W = 1200
H = 630

os.makedirs("public", exist_ok=True)

# 1. Create base background with halftone dots
subprocess.run([
    "convert", "-size", "16x16", "xc:#F2EBDD",
    "-fill", "#DDD5C7", "-draw", "circle 8,8 8,9",
    "/tmp/tile.png"
], check=True)

subprocess.run([
    "convert", "-size", f"{W}x{H}", "tile:/tmp/tile.png",
    "/tmp/base.png"
], check=True)

# 2. Prepare Beatles photo card
subprocess.run([
    "convert", "/tmp/beatles_1963.jpg",
    "-colorspace", "Gray",
    "-contrast-stretch", "1%x1%",
    "-resize", "360x260^",
    "-gravity", "center",
    "-extent", "360x260",
    "-bordercolor", "#151515", "-border", "1",
    "/tmp/photo_cut.png"
], check=True)

subprocess.run([
    "convert", "/tmp/photo_cut.png",
    "-fill", "rgba(0,0,0,0.75)", "-draw", "rectangle 8,230 180,252",
    "-fill", "#FFFFFF", "-font", "Liberation-Mono", "-pointsize", "11",
    "-draw", "text 14,246 'Liverpool to Abbey Road · 1963'",
    "/tmp/photo_labeled.png"
], check=True)

subprocess.run([
    "convert", "-size", "390x340", "xc:#EAE1D2",
    "-bordercolor", "#151515", "-border", "2",
    "/tmp/card_bg.png"
], check=True)

subprocess.run([
    "composite", "-geometry", "+15+35",
    "/tmp/photo_labeled.png", "/tmp/card_bg.png",
    "/tmp/card_with_photo.png"
], check=True)

subprocess.run([
    "convert", "/tmp/card_with_photo.png",
    "-fill", "#151515", "-draw", "rectangle 20,4 165,22",
    "-fill", "#F2EBDD", "-font", "Liberation-Mono-Bold", "-pointsize", "10",
    "-draw", "text 26,17 'PARLOPHONE PMC 1202'",
    "-fill", "#555555", "-font", "Liberation-Mono", "-pointsize", "12",
    "-draw", "text 18,320 'SIDE A: 1962–1966'",
    "-fill", "#C43A2F", "-font", "Liberation-Mono-Bold", "-pointsize", "12",
    "-draw", "text 230,320 'SIDE B: 1967–1970'",
    "/tmp/sleeve_card.png"
], check=True)

subprocess.run([
    "convert", "-size", "394x344", "xc:#151515", "/tmp/sleeve_shadow.png"
], check=True)

CARD_X = 740
CARD_Y = 85
subprocess.run([
    "composite", "-geometry", f"+{CARD_X+5}+{CARD_Y+5}",
    "/tmp/sleeve_shadow.png", "/tmp/base.png",
    "/tmp/comp1.png"
], check=True)

subprocess.run([
    "composite", "-geometry", f"+{CARD_X}+{CARD_Y}",
    "/tmp/sleeve_card.png", "/tmp/comp1.png",
    "/tmp/comp2.png"
], check=True)

im_draw = """
fill '#C43A2F'
font 'Liberation-Mono-Bold'
font-size 15
text 70,68 '· AN INTERACTIVE DATA INVESTIGATION ·'

fill '#151515'
font 'Liberation-Sans-Bold'
font-size 76
text 70,140 'EIGHT YEARS'

fill '#C43A2F'
font 'Liberation-Sans-Bold'
font-size 76
text 70,210 'THAT CHANGED'

fill '#151515'
font 'Liberation-Sans-Bold'
font-size 76
text 70,280 'THE SOUND'

fill '#222222'
font 'Liberation-Sans-Bold'
font-size 22
text 70,325 'THE BEATLES, 1962–1970 · A DATA STORY IN 213 SONGS'

fill '#444444'
font 'Liberation-Serif'
font-size 18
text 70,365 'Start with four young musicians making concise pop songs'
text 70,390 'and covers in the Liverpool club scene; end with four'
text 70,415 'increasingly distinct creative voices using the recording studio'
text 70,440 'itself as part of the composition.'

# Buttons
fill '#151515'
rectangle 70,465 245,505
fill '#FFFFFF'
font 'Liberation-Mono-Bold'
font-size 12
text 85,490 'BEGIN THE STORY  ↓'

fill '#F2EBDD'
stroke '#151515'
stroke-width 2
rectangle 260,465 425,505
stroke 'none'
fill '#151515'
font 'Liberation-Mono-Bold'
font-size 12
text 275,490 'EXPLORE 213 SONGS'

fill '#F2EBDD'
stroke '#151515'
stroke-width 2
rectangle 440,465 565,505
stroke 'none'
fill '#151515'
font 'Liberation-Mono-Bold'
font-size 12
text 455,490 'FIND A WORD'

fill '#EAE1D2'
stroke '#C8C0B2'
stroke-width 1
rectangle 580,465 710,505
stroke 'none'
fill '#C43A2F'
text 590,490 '▶'
fill '#151515'
font 'Liberation-Mono-Bold'
font-size 11
text 605,490 '1964 SOUND'

# Separator
stroke '#C8C0B2'
stroke-width 1
line 70,535 1130,535
stroke 'none'

# Timeline text
fill '#7A7267'
font 'Liberation-Mono'
font-size 12
text 70,555 '1962: "LOVE ME DO"'
fill '#151515'
font 'Liberation-Mono-Bold'
text 470,555 'EIGHT-YEAR TIMELINE PROGRESSION'
fill '#7A7267'
font 'Liberation-Mono'
text 1000,555 '1970: "LET IT BE"'
"""

with open('/tmp/draw_commands.txt', 'w') as f:
    f.write(im_draw)

subprocess.run([
    "convert", "/tmp/comp2.png",
    "-draw", f"@{'/tmp/draw_commands.txt'}",
    "/tmp/comp3.png"
], check=True)

years = [
    ("1962", "#18181B"),
    ("1963", "#27272A"),
    ("1964", "#3F3F46"),
    ("1965", "#B45309"),
    ("1966", "#D97706"),
    ("1967", "#DC2626"),
    ("1968", "#15803D"),
    ("1969", "#166534"),
    ("1970", "#14532D")
]

tb_draw = ""
x = 70
w_seg = 114
for yr, col in years:
    tb_draw += f"fill '{col}'\nrectangle {x},568 {x+w_seg},588\n"
    tb_draw += f"fill '#FFFFFF'\nfont 'Liberation-Mono-Bold'\nfont-size 10\ntext {x+40},582 '{yr}'\n"
    x += w_seg + 4

with open('/tmp/timeline_commands.txt', 'w') as f:
    f.write(tb_draw)

subprocess.run([
    "convert", "/tmp/comp3.png",
    "-draw", f"@{'/tmp/timeline_commands.txt'}",
    "-quality", "92",
    "public/og-image.jpg"
], check=True)

subprocess.run([
    "convert", "public/og-image.jpg", "public/og-image.png"
], check=True)

print("Saved public/og-image.jpg and public/og-image.png")
