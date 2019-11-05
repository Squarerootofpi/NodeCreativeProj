
var app = new Vue({
  el: '#app',
  data: {
    jokes: [],
    index: '',
    numJokes: 0,
    currJoke: '',
  },
  created() {
    this.fetchREST()
  },
  methods: {
    async fetchREST() {
      console.log("In Fetch ");
      var url = "http://cs.creatorof.jsearch.org:4201/getjokes";
      // let response = await request.get(url);
      // let json = JSON.parse(response);
      // console.log("URL " + url);
      // console.log("json ", json);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((jokelist) => {
          console.log("jokelist");
          console.log(jokelist);
          this.jokes = jokelist;
          this.numJokes = jokelist.length;
        });
    },
    getJoke(index) {
      if (index > this.jokes.length -1 )
      {
        console.log("Error");
        throw error;
      }
      if (index === '')
      {
        this.getRand();
      }
      this.currJoke = this.jokes[index];
    },
    getRand() {
      let randJokeNum = Math.floor(Math.random() * jokes.length);
      this.currJoke = this.this.getJoke(randJokeNum);
      console.log(currJoke);

    },
  },
});
