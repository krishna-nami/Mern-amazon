import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN,
    {
      expiresIn: '30d',
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer XXXXX
    jwt.verify(token, process.env.TOKEN, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token found' });
  }
};
