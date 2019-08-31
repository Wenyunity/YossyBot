// This file determines whether conditionals are met or not

function findConditional(conditional, battle, user, target) {
  if (conditional || battle || user || target) {
    return true;
  }
  return false;
}

module.exports = {
  conditional: findConditional,
};
