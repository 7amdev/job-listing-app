const express     = require('express');
const body_parser = require('body-parser');
const path        = require('path');

const app = express();

const jobs = [
  {
     "id":1123412341634563,
     "title":"Front End React Engineer",
     "badgeLetters":"9T",
     "company":"9th Tech",
     "duration":"Full-Time",
     "salary":"$105,000+",
     "location":"Global",
     "relevanceScore":2999,
     "daysAgo":2,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictional9thtechwebsite.com",
     "description":"Join us as we pursue our disruptive new vision to make machine data accessible, usable, and valuable to everyone.",
     "qualifications":[
        "JavaScript",
        "CSS",
        "React",
        "HTML",
        "Node.js",
        "Optional: TypeScript"
     ],
     "reviews":[
        "I had a great internship.",
        "Good stepping stone.",
        "Well-run and organized company.",
        "Great coworkers & opportunities."
     ]
  },
  {
     "id":5553645680007895,
     "title":"Frontend Developer - React",
     "badgeLetters":"AS",
     "company":"AT Security",
     "duration":"Full-Time",
     "salary":"$85,000+",
     "location":"Global",
     "relevanceScore":2998,
     "daysAgo":4,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalatsecuritywebsite.com",
     "description":"Are you passionate about building software that makes a difference? Do you enjoy collaboration with a team of fun and smart creative people?",
     "qualifications":[
        "React",
        "React Native",
        "Redux",
        "Node",
        "GraphQL",
        "GitHub",
        "VS Code"
     ],
     "reviews":[
        "Good support for employees.",
        "Decent pay and career progression.",
        "Wonderful place to work.",
        "Interesting sites to work on."
     ]
  },
  {
     "id":11312545454587,
     "title":"Junior Software Developer",
     "badgeLetters":"AT",
     "company":"Aspen Tech",
     "duration":"Full-Time",
     "salary":"$90,000+",
     "location":"Global",
     "relevanceScore":2997,
     "daysAgo":4,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalaspentechwebsite.com",
     "description":"As a member of the team with a security focus, you will help define the future of our software by designing, creating, testing, and maintaining products that directly support security analysts all across the world.",
     "qualifications":[
        "HTML/CSS/JS",
        "React/React Native",
        "Node/Rails",
        "Apollo client & GraphQL",
        "Bonus: UX/UI"
     ],
     "reviews":[
        "Pay & Benefits are awesome.",
        "Comfortable to work here for sure.",
        "Nice people that will support you.",
        "All good. Recommended."
     ]
  },
  {
     "id":565556437548678300,
     "title":"Remote Full Stack Developer",
     "badgeLetters":"LS",
     "company":"Lockshelf System",
     "duration":"Full-Time",
     "salary":"$80,000+",
     "location":"Global",
     "relevanceScore":2996,
     "daysAgo":3,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionallockshelfsystemwebsite.com",
     "description":"We are seeking talented & passionate web developers to help build new cloud-based services to accompany our flagship product. You will bring curiosity, craft, and a love of helping customers do their best work.",
     "qualifications":[
        "HTML/CSS/JS",
        "React/React Native",
        "Node/Rails",
        "Apollo client & GraphQL",
        "Bonus: UX/UI"
     ],
     "reviews":[
        "Pay & Benefits are awesome.",
        "Comfortable to work here for sure.",
        "Nice people that will support you.",
        "All good. Recommended."
     ]
  },
  {
     "id":435243523542435,
     "title":"Full-Stack Developer",
     "badgeLetters":"LO",
     "company":"LakeOperations",
     "duration":"Full-Time",
     "salary":"$80,000+",
     "location":"Global",
     "relevanceScore":1999,
     "daysAgo":1,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionallakeoperationswebsite.com",
     "description":"As a full-stack developer, you will be responsible for designing, developing and deploying full-stack solutions in support of LakeOperations' core business.",
     "qualifications":[
        "JavaScript",
        "CSS",
        "React",
        "HTML",
        "Node.js",
        "Responsive web design",
        "MongoDB/NoSQL"
     ],
     "reviews":[
        "Best place I've ever worked. I learned a lot.",
        "I liked that we could work remotely.",
        "Very nice benefits for online learning.",
        "Great coworkers, opportunities."
     ]
  },
  {
     "id":23542345745674570,
     "title":"Front-End Developer",
     "badgeLetters":"CH",
     "company":"ComputerHaver",
     "duration":"Full-Time",
     "salary":"$85,000+",
     "location":"Global",
     "relevanceScore":1998,
     "daysAgo":1,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalcomputerhaverwebsite.com",
     "badgeBgColor":"#3d87f1",
     "description":"Under the direction of the Eng. Manager, the front-end developer will maintain web pages and web apps for the family of ComputerHaver websites.",
     "qualifications":[
        "JavaScript",
        "CSS",
        "React",
        "HTML",
        "Optional: Angular 2+",
        "Optional: Vue.js"
     ],
     "reviews":[
        "Remote work here is possible.",
        "Fantastic place to work. Enjoyed it.",
        "Great benefits for learning, also online.",
        "Good opportunities for your career."
     ]
  },
  {
     "id":68968756834563464,
     "title":"Software Developer",
     "badgeLetters":"CS",
     "company":"CapSoft",
     "duration":"Full-Time",
     "salary":"$100,000+",
     "location":"Global",
     "relevanceScore":1997,
     "daysAgo":1,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalcapsoftwebsite.com",
     "description":"We're always looking for top talent in software development so we want to learn about why you feel that's you, what drives you, where you see your career headed, and why you think InsureNow could be the right next move for you.",
     "qualifications":[
        "JavaScript",
        "CSS",
        "React",
        "HTML",
        "NoSQL",
        "Optional: SQL",
        "Optional: Python"
     ],
     "reviews":[
        "Nice place to learn the industry.",
        "Knowledgeable coworkers.",
        "Fast-paced but doable.",
        "Good work-from-home policy."
     ]
  },
  {
     "id":898679876973546,
     "title":"Junior Software Developer",
     "badgeLetters":"RR",
     "company":"Rey and Rey",
     "duration":"Full-Time",
     "salary":"$95,000+",
     "location":"Global",
     "relevanceScore":1996,
     "daysAgo":2,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalreyandreywebsite.com",
     "description":"We are looking for an entry-level software developer with enthusiasm, broad exposure to different types of development tasks. This position will support a wide array of services and features.",
     "qualifications":[
        "HTML",
        "CSS",
        "JavaScript",
        "React/Angular/Vue",
        "Node.js",
        "MongoDB/NoSQL",
        "Optional: SQL"
     ],
     "reviews":[
        "Good place to start your developer career.",
        "Decent benefits and pay.",
        "Growing company with good opportunities.",
        "Good place to work."
     ]
  },
  {
     "id":32412342141234,
     "title":"JavaScript Developer",
     "badgeLetters":"NO",
     "company":"NewOperator",
     "duration":"Full-Time",
     "salary":"$75,000+",
     "location":"Global",
     "relevanceScore":1995,
     "daysAgo":2,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalnewoperatorwebsite.com",
     "description":"In this role, you will utilize the NewOperator platform to provide support to consulting and technical teams by contributing to various stages of the software development life cycle.",
     "qualifications":[
        "HTML",
        "Ability to learn quickly",
        "CSS",
        "JavaScript",
        "React",
        "MongoDB/NoSQL"
     ],
     "reviews":[
        "Life-changing opportunity to work here!",
        "Stable job with growth.",
        "Nice amenities and training culture.",
        "Good work environment."
     ]
  },
  {
     "id":345634575475476,
     "title":"Node.js Software Engineer",
     "badgeLetters":"PT",
     "company":"PredICT",
     "duration":"Full-Time",
     "salary":"$100,000+",
     "location":"Global",
     "relevanceScore":1994,
     "daysAgo":4,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalpredICTwebsite.com",
     "description":"Leverage a deep understanding of software development to develop solutions. Develop backend and frontend solutions to increase security and incorporate new features.",
     "qualifications":[
        "JavaScript",
        "Sass/SCSS",
        "React",
        "HTML",
        "Node.js",
        "Responsive web design",
        "Webpack"
     ],
     "reviews":[
        "They really care about employees.",
        "Great workfloor culture.",
        "Nice work-life balance.",
        "Great place to work!"
     ]
  },
  {
     "id":990796582354534,
     "title":"Assistant Web Developer",
     "badgeLetters":"PS",
     "company":"Pear & So",
     "duration":"Full-Time",
     "salary":"$105,000+",
     "location":"Global",
     "relevanceScore":1993,
     "daysAgo":3,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalpear&soswebsite.com",
     "description":"We are looking for a talented Junior Full Stack Developer to add to our team! This is a great opportunity to sharpen your front and back-end development skills in a fun and innovative environment.",
     "qualifications":[
        "React",
        "Bootstrap",
        "JavaScript",
        "CSS",
        "Node/NPM",
        "APIs (Rest, GraphQL)"
     ],
     "reviews":[
        "Very nice growth possibilities.",
        "Good compensation packages.",
        "They allow work from home.",
        "Good company & good training."
     ]
  },
  {
     "id":634634363464563500,
     "title":"Senior Web Developer",
     "badgeLetters":"VV",
     "company":"Veri Veri",
     "duration":"Full-Time",
     "salary":"$80,000+",
     "location":"Global",
     "relevanceScore":1992,
     "daysAgo":4,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalveriveriwebsite.com",
     "description":"The Full Stack Developer will lead the development of major features and implementations, including helping to design the architecture for those features.",
     "qualifications":[
        "JavaScript",
        "React",
        "TypeScript",
        "Node.js",
        "CSS",
        "Optional: Microservices",
        "Optional: Docker"
     ],
     "reviews":[
        "Decent pay relative to market rate.",
        "Great place for new engineer.",
        "Overall very good.",
        "I like my team."
     ]
  },
  {
     "id":96069683624625420,
     "title":"Front End Web Developer",
     "badgeLetters":"PC",
     "company":"Piper Corporate",
     "duration":"Full-Time",
     "salary":"$120,000+",
     "location":"Global",
     "relevanceScore":1991,
     "daysAgo":5,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalpipercorporatewebsite.com"
  },
  {
     "id":45665689000765350,
     "title":"Front End Developer",
     "badgeLetters":"KS",
     "company":"KSMA",
     "duration":"Full-Time",
     "salary":"$90,000+",
     "location":"Global",
     "relevanceScore":1990,
     "daysAgo":1,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalksmawebsite.com"
  },
  {
     "id":77767676356565660,
     "title":"Full-Stack Web Engineer",
     "badgeLetters":"VT",
     "company":"Vision Tower",
     "duration":"Full-Time",
     "salary":"$95,000+",
     "location":"Global",
     "relevanceScore":1989,
     "daysAgo":2,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalvisiontowerwebsite.com"
  },
  {
     "id":9967898989857690,
     "title":"Full-Stack JavaScript",
     "badgeLetters":"TP",
     "company":"The Technology Paper",
     "duration":"Full-Time",
     "salary":"$100,000+",
     "location":"Global",
     "relevanceScore":1988,
     "daysAgo":3,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalthetechnologypaperwebsite.com"
  },
  {
     "id":65436513221353250,
     "title":"Back End Web Developer",
     "badgeLetters":"ES",
     "company":"Epsilon Services",
     "duration":"Full-Time",
     "salary":"$97,000+",
     "location":"Global",
     "relevanceScore":1987,
     "daysAgo":5,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalepsilonserviceswebsite.com"
  },
  {
     "id":65656655454343586000,
     "title":"Senior Frontend Developer",
     "badgeLetters":"PS",
     "company":"Purple Street",
     "duration":"Full-Time",
     "salary":"$85,000+",
     "location":"Global",
     "relevanceScore":1986,
     "daysAgo":1,
     "coverImgURL":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&h=348&q=100",
     "companyURL":"https://fictionalpurplestreetwebsite.com"
  }
];

app.use(body_parser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/jobs', function (req, res) {
  const { q, sort, offset = 1, limit = 7 } = req.query; 
  let results = [...jobs];
  let sort_arr = sort && sort.split(',') || [];
 
  // FILTER / queryString
  if (q) {
    results = results.filter(function (job) {
      return job.title.toLocaleLowerCase().includes(q.toLocaleLowerCase());
    });
  }
  res.setHeader('x-total-count', results.length);

  // SORT
  if (sort_arr.includes('+score')) {
    results = results.sort(function (a, b) {
      if (a.relevanceScore > b.relevanceScore) return  1;
      if (a.relevanceScore < b.relevanceScore) return -1;
      return 0;
    });
  } 
  if (sort_arr.includes('-score')) {
    results = results.sort(function (a, b) {
      if (a.relevanceScore < b.relevanceScore) return  1;
      if (a.relevanceScore > b.relevanceScore) return -1;
      return 0;
    });
  }
  if (sort_arr.includes('+days_ago')) {
    results = results.sort(function (a, b) {
      if (a.daysAgo > b.daysAgo) return  1;
      if (a.daysAgo < b.daysAgo) return -1;
      return 0;
    });
  }
  if (sort_arr.includes('-days_ago')) {
    results = results.sort(function (a, b) {
      if (a.daysAgo < b.daysAgo) return  1;
      if (a.daysAgo > b.daysAgo) return -1;
      return 0;
    });
  }  

  // PAGINATION
  const range_start = (offset - 1) * limit;
  const range_end   = range_start + limit;

  results = results.slice(range_start, range_end);
  
  res.json(results);
});

app.get('/jobs/:id', function (req, res) {
  const { id } = req.params; 

  const job = jobs.find(function (item) {
    return item.id === +id;
  });

  if (!job) {
    return res.status(404).json({ error: `Resource with id: ${id} not found!`});
  }

  res.json(job);
});

app.post('/jobs', function (req, res) {
  // code to add a new job
  res.json(req.boby);
});

app.put('/jobs/:id', function (req, res) {
  const { id } = req.params;
  // code to update the job
  res.json(req.body);
});

app.patch('/jobs/:id', function (req, res) {
  const { id } = req.params;
  const jobExists = jobs.find(job => job.id === id);

  if (!jobExists) {
    return res.status(400).json({ error: 'Job doesnt exists' })
  }

  // code to patch the job

  res.json(req.body);
});

app.delete('/jobs/:id', function (req, res) {
  const { id } = req.params;
  // code to delete the job
  res.json({ deleted: id });
});

app.get('/', function (req, res) {
  console.log('any');
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 5005, function () {
 console.log('Server running...'); 
})