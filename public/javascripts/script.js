
var app = new Vue({
  el: '#app',
  data: {
    jokes: [],
    index: '',
    numJokes: 0,
    currJoke: '',
    index: '',
  },
  created() {
    this.fetchREST()
  },
  methods: {
    async fetchREST() {
      console.log("In Fetch ");
      //Whichever site is hosting it, will have to comment out the other person's, etc.
      var url = "http://cs.creatorof.jsearch.org:4201/getjokes";
      //var url = "http://jtullis.com:4201/getjokes";
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((jokelist) => {
          this.jokes = jokelist;
          this.numJokes = jokelist.length;
        });
    },
    getJoke() {
      if (this.index > this.jokes.length - 1 ) {
        console.log("Error");
        throw error;
      }
      this.currJoke = this.jokes[this.index];
    },
    getRand() {
      this.index = Math.floor(Math.random() * this.jokes.length);
      this.currJoke = this.jokes[this.index];
    },
  },
});
