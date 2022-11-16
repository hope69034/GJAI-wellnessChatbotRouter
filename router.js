
const { spawn } = require("child_process");

const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {    
  res.redirect("http://127.0.0.1:5500/greeni.html")
});

router.post('/Greeni', function (req, res) {    
  console.log('1. 라우터진입')
  let userInput = req.body.userInput
  let data = "";
  console.log('2. 바디파서')
  // const spawn = require("child_process").spawn;
  // aws ec2서버에는 python3가 깔려있어서 3로
  //const outp = spawn("python3", ["talkmodel.py", userInput]);

  const outp = spawn("python3", ["talkmodel.py"]);
  console.log('3. talkmodel 변수선언성공 stdout 진입 아직 안함 = 나 : '+ userInput + ', 타입: ' + typeof(userInput))

  try{
  outp.stdout.on("data", (result) => {
    //console.error('에러남')
    console.log('4. stdout 진입 성공 ')
    //console.log('그리니 : '+result.toString());
    res.json(result.toString())
  });

}catch{
    res.send('음!!')
  }

  
});

module.exports = router;


/*     res.render("greeniTalk", {
      userInput: userInput,
      greeniOutput: result.toString(),
    }); */
