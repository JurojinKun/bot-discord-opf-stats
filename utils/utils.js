function capitalizeEachWord(str) {
  return str
    .split(" ")
    .map((word) =>
      word
        .split("-")
        .map((subWord) =>
          subWord
            .split("(")
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join("(")
        )
        .join("-")
    )
    .join(" ");
}

function findType(type) {
    switch (type) {
      case "p":
      case "perso":
      case "personnage":
        return "Personnage";
      case "f":
      case "fafa":
      case "familier":
        return "Familier";
      case "ar":
      case "w":
      case "weapon":
      case "arme":
        return "Arme";
      case "ac":
      case "accessory":
      case "accesoire":
        return "Accessoire";
      default:
        return "Type inconnu";
    }
  }

module.exports = { capitalizeEachWord, findType };
