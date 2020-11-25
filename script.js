//declaration de mes variable
const produits = [];
var sommeTotale = 0; // Cette variable concervera la somme totale des achats
var sommeInviduelle = 0; //La somme individuelle de chaque article
var depense = 0


/*fonction de recuperation de données du tableau pour les 
  afficher dans le tableau html
*/
function fetchToutsLesProduits(produits) {

  // Récupération de l'élement
  const element = document.getElementsByTagName("tbody")[0];
  element.innerHTML = "";

  let donnee = "";
  // Récupération des données
  produits.forEach((m, index) => {
    donnee += `<tr>

        <td>${m.nom}</td>
        <td>${m.prix} GNF</td>
        <td>${m.quantite}</td>
        <td>${m.quantite * m.prix} GNF</td>
        <td>
            <button class="edit btn btn-sm btn-outline-success" value="${index}">Mettre à jour</button>
            <button class="delete btn btn-sm btn-outline-danger" value="${index}">Supprimer</button></td>
        </tr>`;   
  });
  //sommeTotale = sommeTotale + sommeInviduelle;

  // Affichage des éléments dans le HTML
  element.innerHTML += donnee;
  //evenement ajouté au bouton de modication
  document.querySelectorAll('button.edit').forEach(b => {
    b.addEventListener('click', function () {
      return modifierProduit(this.value);
    })
  })
  //evenement ajouté au bouton de suppression

  document.querySelectorAll("button.delete").forEach(b => {
    b.addEventListener("click", function () {
      return supprimer(this.value);
    })
  })

}
/*Fin de la fonction d'affichage du tableau html*/
fetchToutsLesProduits(produits);

/* Creation du formulaire d'ajout d'élément dans le tableau*/

// ici on cache le formulaire par defaut
const formulaire = document.getElementById('form');
formulaire.style.display = "none";

//ici on l'affiche lorqu'on clique sur le bouton ajouter produit du formulaire
document.getElementById("ajouter-produit").addEventListener("click", function () {
  display();
})

//ici on cache les champs de formulaire lorsque l'utilisateur clique sur le bouton annuler
document.getElementById("annuler").addEventListener('click', function () {
  hideForm();
}) // FIN DE LA FONCTION fetchToutsLesProduits(produits); 


// la fonction qui cache le formulaire dans le document html
function hideForm() {
  formulaire.style.display = 'none';

  document.getElementById("nom").value = "";
  document.getElementById('prix').value = "";
  document.getElementById('quantite').value = "";
}

// fonction qui affiche le formulaire dans le document html
function display() {
  formulaire.style.display = "flex"; // fonction pour ajouter le formulaire
}

// evenment  qui me permet d'ajouter la depense
document.getElementById("ajouter-depense").addEventListener('click', function () {
  if (document.getElementById("depense").value == 0) {
    alert("Veuillez entrer un montant comme votre  depense !");
  } else {
    depense = document.getElementById("depense").value;
    document.getElementById("ecran").value = depense;
    document.getElementById("depense").value = "";
  }
})

//evenement d'insertion de produit dans le  tableau

document.getElementById('sauvergarde').addEventListener("click", function () { // on associe un évenement event au bouton

  // récuperation des valeurs provenant des champs de formulaire
  const nom = document.getElementById("nom").value;
  const prix = document.getElementById('prix').value;
  const quantite = document.getElementById('quantite').value;
  var montant = prix * quantite;

  if(montant <= document.getElementById('ecran').value){
    if (nom && prix && quantite !== '') 
    { //on verifie si tous les champs sont remplis
      //nouvelle ligne
      const produit = {
        nom: nom,
        prix: prix,
        quantite: quantite
      };
      //ajout de la nouvelle ligne
      if (document.getElementById("hidden").value.length > 0) {
        //dans cette condition on verifie si c'est un ajout ou une modification
        produits.splice(document.getElementById("hidden").value, 1, produit);
        let newValue =  document.getElementById('ecran').value - montant
        document.getElementById('ecran').value = newValue;
        document.getElementById("nom").value = "";
        document.getElementById('prix').value = "";
        document.getElementById('quantite').value = "";
        let valeur = Number(document.getElementById('ecran').value ) + Number( produit.prix * produit.quantite);
        document.getElementById('ecran').value = valeur
        } 
        else {
          produits.push(produit)
          let newValue = document.getElementById('ecran').value - montant
          document.getElementById('ecran').value = newValue;
          document.getElementById("nom").value = "";
          document.getElementById('prix').value = "";
          document.getElementById('quantite').value = "";
        }; // si c'est ajout
      } else {
      // inititialisation des champs
      alert("Veuillez remplir tous les champs !");
    }

  }else{
    alert('Votre dépense est inferieur ! ')
  }
  return fetchToutsLesProduits(produits);
}); // FIN DE LA FONCTION D'INSERTION



//fonction de modification d'un element partir de son index
function modifierProduit(index) {
  // Récupération de la ligne via son index
  const produit = produits.find((m, i) => {
    return i == index;
  });

  // Alimentation des champs
  document.getElementById("nom").value = produit.nom;
  document.getElementById('prix').value = produit.prix;
  document.getElementById('quantite').value = produit.quantite;
  document.getElementById("hidden").value = index;


  
  display()
}

//la fonction supprimer
function supprimer(index) {
  if (confirm("Voullez-vous supprimer cet arcle ? ")) {
    const produit = produits.find((m,i) =>{
      return i == index
    });
    let valeur = Number(document.getElementById('ecran').value ) + Number( produit.prix * produit.quantite);
    document.getElementById('ecran').value = valeur
    produits.splice(index, 1);
    fetchToutsLesProduits(produits);  
  }
}

