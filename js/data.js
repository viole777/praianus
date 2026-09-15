/* ============================================================
   PRAIANUS — Dados do cardápio
   Use apenas os pratos já cadastrados no projeto (imagens/).
   NÃO INVENTE pratos novos.
   Campos:
     name        — nome do prato
     description — descrição curta
     price       — deixe null até existir preço cadastrado
     image       — caminho da imagem em images/
     category    — categoria do prato
     featured    — true para aparecer em "Os favoritos da casa"
   ============================================================ */

window.PRAIANUS = {
  dishes: [
    // ----- Pratos principais -----
    {
      id: "moqueca-praiana",
      name: "Moqueca Praiana",
      description: "A moqueca da casa, com caldo encorpado e tempero que abraça. Feita para o centro da mesa e para dividir.",
      price: null,
      image: "images/moquecapraiana.png",
      category: "Pratos principais",
      featured: true
    },
    {
      id: "carne-de-sol",
      name: "Carne de Sol",
      description: "No ponto certo: macia, suculenta e com aquele sabor marcante do interior. Ótima para compartilhar.",
      price: null,
      image: "images/carnedesolmormaço.png",
      category: "Pratos principais",
      featured: true
    },
    {
      id: "salmao-bela-praia",
      name: "Salmão à Bela Praia",
      description: "Salmão grelhado no ponto, leve e saboroso, com o toque especial da nossa cozinha.",
      price: null,
      image: "images/salmaobelapraia.png",
      category: "Pratos principais",
      featured: true
    },

    // ----- Entradas -----
    {
      id: "linguica-artesanal",
      name: "Linguiça Artesanal",
      description: "Linguiça artesanal dourada na hora. Perfeita para abrir o apetite e dividir com a mesa.",
      price: null,
      image: "images/linguicaartesanal.png",
      category: "Entradas"
    },
    {
      id: "pao-de-alho",
      name: "Pão de Alho",
      description: "Clássico das mesas de praia: dourado por fora, quentinho por dentro e impossível resistir.",
      price: null,
      image: "images/paodealho.png",
      category: "Entradas"
    },
    {
      id: "queijo-de-coalho",
      name: "Queijo de Coalho",
      description: "Grelhado do jeito certo: casquinha dourada por fora, macio e puxando por dentro.",
      price: null,
      image: "images/queijocoalho.png",
      category: "Entradas"
    }
  ]
};
