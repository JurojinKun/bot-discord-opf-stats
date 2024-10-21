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
      case "personnage":
        return "Personnage";
      case "familier":
        return "Familier";
      case "arme":
        return "Arme";
      case "accessoire":
        return "Accessoire";
      default:
        return "Type inconnu";
    }
  }

module.exports = { capitalizeEachWord, findType };
