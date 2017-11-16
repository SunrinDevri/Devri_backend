import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

module.exports = (Users) =>{
  //passport serialize
  passport.serializeUser((user, done)=>{
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((obj, done)=>{
    console.log(obj);
    done(null, obj);
  });

  passport.use(new LocalStrategy({ // local 전략을 세움
      usernameField: 'pin',
      passwordField: 'code',
      session: true, // 세션에 저장 여부
      passReqToCallback: false,
    }, async function(pin, code, done){
      let user = await Users.findOne({pin: pin, code: code} , {__v: 0, _id:0});
      if(user) return done(null, user);
      else return done(null, false, {message: "아이디나 비밀번호가 틀렸습니다"})
    }));


  return passport;
}
