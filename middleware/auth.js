const auth = async (req, res, next) => {
  console.log("auth user")
  next()
}

export default auth