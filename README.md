# ☕ Cafeneaua After Hours

Site pentru o cafenea fictivă, realizat ca proiect la disciplina **UI/UX**, anul 2 Informatică.

After Hours este un loc unde oamenii pot savura cafea, deserturi și timp petrecut cu prietenii într-o atmosferă liniștită. Site-ul prezintă meniul, permite rezervări și oferă datele de contact ale cafenelei.

## 🔗 Demo live

👉 [Vezi site-ul aici](https://luraaa18.github.io/site-cafenea/)

## ✨ Funcționalități

- **5 pagini**: Acasă, Meniu, Rezervare, Despre, Contact
- **Light mode / Dark mode** — temă schimbabilă din panoul de setări
- **Text normal / Text mare** — pentru accesibilitate
- **Meniu interactiv** — utilizatorii pot „comanda” produse, iar cele mai populare sunt evidențiate și mutate în față
- **Formular de rezervare** cu validare (nume, email, telefon, dată, oră, număr persoane)
- **Formular de contact** cu validare
- **Salvare locală** — tema, mărimea textului și comenzile rămân setate între vizite (localStorage)
- **Panou de Ajutor** cu întrebări frecvente
- **Design responsive** — funcționează pe telefon, tabletă și desktop
- **Notificări toast** pentru acțiunile utilizatorului

## 🛠️ Tehnologii

- HTML5
- CSS3 (variabile CSS, grid, flexbox, media queries)
- JavaScript vanilla (fără librării externe)
- localStorage pentru persistența datelor

## 📂 Structura proiectului

```
cafenea-after-hours/
├── index.html         # Pagina principală
├── meniu.html         # Meniu cu sistem de comenzi
├── rezervare.html     # Formular de rezervare
├── despre.html        # Despre cafenea
├── contact.html       # Date contact + formular
├── style.css          # Stiluri (cu suport light/dark)
└── script.js          # Logica: teme, meniu, validări, formulare
```

## 🚀 Cum îl rulezi local

1. Descarcă sau clonează repo-ul:
   ```
   git clone https://github.com/luraaa18/site-cafenea.git
   ```
2. Deschide `index.html` în browser. Gata.

Nu e nevoie de server sau de instalări — e un site static.

## 📝 Validări implementate

| Câmp | Regulă |
|------|--------|
| Nume | minim 3 litere, doar caractere valide |
| Email | format valid (`x@y.z`) |
| Telefon | 10 cifre, începe cu 0 |
| Dată | doar din viitor |
| Persoane | între 1 și 20 |
| Mesaj | minim 10 caractere |

## 👤 Autor

**Matei Laura-Jennifer** — Informatică, anul 2

---

*Proiect realizat în scop educațional.*
