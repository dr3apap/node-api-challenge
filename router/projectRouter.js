const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/", (req, res) => {
  const postData = db
    .insert(req.body)
    .then(postData => {
      if (req.body) {
        res.status(201).json(postData);
      } else {
        res.send("Please send a valid data");
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get("/", (req, res) => {
  const data = db
    .get()
    .then(data => {
      res.status(200).json(data);
    })

    .catch(error => {
      res.status(500).send(error);
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const projectId = db
    .get(req.params.id)
    .then(projectId => {
      res.status(200).json(projectId);
      next();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const remove = db
    .remove(req.params.id)
    .then(remove => {
      res.status(200).json(remove);

      next();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id/", validateProjectId, (req, res) => {
  const add = db
    .update(req.params.id, req.body)
    .then(update => {
      res.status(200).json(add);
      next();
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const actionsList = db
    .getProjectActions(req.params.id)
    .then(actionsList => {
      if (actionsList) {
        res.status(200).json(actionsList);
      } else {
        res.json({ message: "sorry, can't find actions with that id" });
      }
      next();
    })

    .catch(error => {
      res.status(500).send(error);
    });
});

//Middleware

function validateProjectId(req, res, next) {
  let project = db
    .get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(400).json({ message: "invalid project id" });
      } else {
        req.project = project;
        next();
      }
    })
    .catch(error => {
      res.send(error);
    });
}

module.exports = router;
