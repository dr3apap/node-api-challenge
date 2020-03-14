const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/:id", validateActionId, (req, res) => {
  const newAction = { ...req.body, action: req.params.id };

  db.insert(newAction).then(newAction => {
    if (newAction) {
      res.status(201).json(req.body);
    } else {
      res.status(500).json({ message: "server error" });
      next();
    }
  });
});

router.get("/", (req, res) => {
  let action = db
    .get()
    .then(action => {
      if (action) {
        res.status(200).json(action);
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get("/:id", validateActionId, (req, res) => {
  let actionId = db
    .get(req.params.id)
    .then(actionId => {
      if (actionId) {
        res.status(200).json(actionId);
      }
      next();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  let deleteAction = db
    .remove(req.params.id)
    .then(deleteAction => {
      if (deleteAction) {
        res.status(200).json(deleteAction);
      }
      next();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id", validateActionId, (req, res) => {
  const update = db
    .update(req.params.id, req.body)
    .then(update => {
      res.status(201).json(update);
      next();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

//Middleware

function validateActionId(req, res, next) {
  let action = db
    .get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(500).json({ message: "invalid action id" });
      } else {
        req.action = action;
        next();
      }
    })
    .catch(error => {
      res.send(error);
    });
}

module.exports = router;
