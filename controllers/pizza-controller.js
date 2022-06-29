const { Pizza } = require('../models');

const pizzaController = {
  // get all pizzas        Get   http://localhost:3001/api/pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments', //pizza also populates comments
        select: '-__v'   // The minus sign - in front of the field indicates that we don't want it to be returned.
      })
      .select('-__v')  //this put the sort in DESC order by the _id value
      .sort({ _id: -1 })   //newest item returns first
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // get one pizza by id  Get http://localhost:3001/api/pizzas/<pizza-id-here>
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments', //pizza also populates comments
        select: '-__v' // The minus sign - in front of the field indicates that we don't want it to be returned.
      })
      .select('-__v')         //  //this put the sort in DESC order by the _id value
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createPizza    Post http://localhost:3001/api/pizzas
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },

  // update pizza by id  Put http://localhost:3001/api/pizzas/<pizza-id-here>
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza  Delete  localhost:3001/api/pizzas/<pizza-id-here>
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
