Vue.component('modal', {
  template: '#modal-template'
})

var app = new Vue({
  el: "#app",
  data: {
    password: null,
    p_length: 0,
    has_lowercase: false,
    has_uppercase: false,
    has_number: false,
    has_symbol: false,
    has_space: false,
    p_length_accepted: false,
    typed: false,
    showSpaceError: false,
    showMaxLengthReached: false,
    showPasswordSaved: false,
    showDuplicateDetected: false,
    score: 0,
    rating: null,
    suggestions:[],
    passwords:{}
   },

  mounted () {
      this.$http.get('http://server.jay/projects/digest-skills-test/backend/public/api/passwords').then(function(data){
      this.passwords = data.body;
    });
   },

  methods: {

    p_input: function() {
      this.score = 0;
      this.rating = null;
      this.suggestions = [];

      this.p_length = this.password.length;
      if (this.p_length >= 8 && this.p_length <= 30) {
        this.p_length_accepted = true;
      } else {
        this.p_length_accepted = false;
      }

      if (this.p_length > 0) {
        this.typed = true;
      } else {
        this.typed = false;
      }

      this.has_lowercase = /[a-z]/.test(this.password);
      this.has_number = /\d/.test(this.password);
      this.has_symbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(this.password);
      this.has_uppercase = /[A-Z]/.test(this.password);
      this.has_space = /[ ]/.test(this.password);

      if(this.p_length == 30){
        this.showMaxLengthReached = true;
      }

      if(this.p_length_accepted) this.score++;
      if(this.has_lowercase && this.has_uppercase) this.score++;
      if((this.has_lowercase && this.has_uppercase) && (this.has_number || this.has_symbol))  this.score++;



      switch (this.score) {
        case 0: this.rating = "Weak yan bro.."; break;
        case 1: this.rating = "Not bad cowboy.."; break;
        case 2: this.rating = "Good enough."; break;
        case 3: this.rating = "Strong! Eh di wow.."; break;
      }

      if(this.score < 3)  for(i=1; i<=3; i++) this.suggestions.push(this.generateStrongPass(this.password));

      if(this.checkDups(this.password)){
          this.showDuplicateDetected = true;
          this.fieldsReset();
      }

    },

    checkDups: function (passwordinput){

        for (index in this.passwords)
          if(this.passwords[index].password == this.password)
          {  return true;  }
        return false;
    },

    postPassword: function(){
          this.$http.post("http://server.jay/projects/digest-skills-test/backend/public/api/password",{password:this.password}).then(function(data){
          this.showPasswordSaved =  true;
          this.fieldsReset();
          this.listRefresh();
        });
    },

    listRefresh: function(){
        this.$http.get('http://server.jay/projects/digest-skills-test/backend/public/api/passwords').then(function(data){
        this.passwords = data.body;
        });
    },

    fieldsReset: function(){
      this.password = "";
      this.typed = false;
      this.p_length = 0;
      this.rating = null;
      this.has_lowercase = false;
      this.has_uppercase = false;
      this.has_number = false;
      this.has_symbol = false;
      this.has_space = false;
      this.p_length_accepted = false;
      this.password.autofocus;
      this.score = 0;
    },


    generateStrongPass: function (password){
      var symbols = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
      var lowercase = 'abcdefghijklmnopqrstuvwxyz';
      var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var numbers = '0123456789';

      var all = symbols + lowercase + uppercase + numbers;

      String.prototype.pick = function(min, max) {
          var n, chars = '';
          if (typeof max === 'undefined') {  n = min;  }
          else { n = min + Math.floor(Math.random() * (max - min + 1));  }

          for (var i = 0; i < n; i++) {
              chars += this.charAt(Math.floor(Math.random() * this.length));
          }
          return chars;
      };


      String.prototype.shuffle = function() {
          var array = this.split('');
          var tmp, current, top = array.length;

          if (top) while (--top) {
              current = Math.floor(Math.random() * (top + 1));
              tmp = array[current];
              array[current] = array[top];
              array[top] = tmp;
          }
          return array.join('');
      };


      var newpass = '';
      newpass += symbols.pick(1);
      newpass += lowercase.pick(1);
      newpass += uppercase.pick(1);
      newpass += numbers.pick(1);
      newpass += all.pick(3,6);
      newpass = newpass.shuffle();

      if(password.length >= 20) password = password.slice(0,19);
      password += newpass;
      return(password);
    }






  }
});
