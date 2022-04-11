(async () => {
  const bcrypt = require('bcryptjs');
  let password = 'I<3ChasingCars!';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)
})();
