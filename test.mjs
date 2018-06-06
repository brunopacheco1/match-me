import Mocha from "mocha"

const mocha = new Mocha()
mocha.addFile("./test/ProfileRestTest.mjs")

mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures ? 1 : 0)
  })
})