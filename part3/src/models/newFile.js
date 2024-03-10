const { PersonSchema } = require("./Person");

PersonSchema.path("number").validate(function (v) {
  if (typeof v === "string") {
    const [first, second] = v.split("-");
    console.log(first.length);
    if (
      first.length < 2 ||
      // seconnd.length < 3 ||
      isNaN(first) ||
      isNaN(second)
    ) {
      throw new Error("invalid number");
    }
  }
  return true;
}, "Number `{VALUE}` is not valid number");
