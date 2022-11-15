
const { spawn } = require("child_process");

const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {    
  res.redirect("http://127.0.0.1:5500/greeni.html")
});

router.post('/Greeni', function (req, res) {    
  console.log('라우터1')
  let userInput = req.body.userInput
  let data = "";
  console.log('라우터2')
  // const spawn = require("child_process").spawn;
  const outp = spawn("python3", ["talkmodel.py", userInput]);
    console.log('greeni라우터진입: 나 : '+ userInput + ', 타입: ' + typeof(userInput))
    outp.stdout.on("data", (result) => {
      console.log('그리니 : '+result.toString());
      res.json(result.toString())
  });
});

module.exports = router;


/*     res.render("greeniTalk", {
      userInput: userInput,
      greeniOutput: result.toString(),
    }); */
