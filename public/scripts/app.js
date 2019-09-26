
$(document).ready(function() {

  // //prevent reload
  // $(".completedbtn").click(function(e) {
  //   e.preventDefault();

  // });

  const loadPage = function() {
    $.ajax({
      method: "GET",
      url: "/"
    })
      .then(function(data) {

      })
      .fail(err => {
        console.log(err);
      });
  };
// $().load();
  $(() => {
    $.ajax({
      method: "POST",
      url: "/:table/:id/complete"
    }).done((data) => {
      buildElement('generation book test', 'www.goodreads.com', 'bookbookbook');
      buildElement('generation test', 'www.imbd.com', 'moviemoviemovie');
      buildElement('generation test movie2', 'www.imbd.com', 'secondmoviemoviemovie');
      buildElement('generation food', 'www.zomato.com', 'foodfoodfood');
      loadPage();
    });
  });
  const buildElement = function(name, link, context) {
    let externalbuttonname = '';
    let section = '';
    let href = '';
    let hrefcomplete = '';

    if (link.includes('products')) {
      externalbuttonname = 'mazon';
      section = '.productSection';
      href += 'products/';
      href += '2'; // hardcoded but should be item id
      hrefcomplete = href + '/complete';
    }

    if (link.includes('goodreads')) {
      externalbuttonname = 'goodreads';
      section = 'bookSection';
      href += 'books/';
      href += '2'; // hardcoded but should be item id
      hrefcomplete = href + '/complete';
    }
    if (link.includes('imbd')) {
      console.log('link include imbd');
      externalbuttonname = 'Imbd';
      section = 'movieSection';
      href += 'movies/';
      // href += idquery
      href += '2'; // hardcoded but should be item id
      hrefcomplete = href + '/complete';
    }
    if (link.includes('zomato')) {
      console.log('zomato link detected');
      externalbuttonname = 'Zomato';
      section = 'restSection';
      href += 'restaurants/';
      href += '2'; // hardcoded but should be item id
      hrefcomplete = href + '/complete';
    }
    if (link === '') {
      externalbuttonname = '';
      section = 'miscSection';
      href += 'misc/';
      href += '2'; // hardcoded but should be item id
      hrefcomplete = href + '/complete';
    }
    // href = query db for /:table/:id
    // let href = '/products/2';
    $('.' + section).append(

      `<div class="${section}">
      <div class="toDoList">
        <div class="itemHeader">
          <a href="${href}" class="leftItem itemTitleHeader"><h4>${name}</h4></a><br>
          <a href="${link}" class="rightItem"><button class="btn btn-outline-dark">${externalbuttonname}</button></a>
          <form class="completedbtn" action="${hrefcomplete}" method="POST">
            <button class="btn btn-outline-success">Complete</button>
          </form>
        </div>
        <p class="itemContext">${context}</p>
        </div>`);

//     $('.bookSection').after(`
// <div class="toDoList">
//             <div class="itemHeader">
//               <a href="/movies/3" class="leftItem itemTitleHeader"><h4>avengertest imbd</h4></a><br>
//               <a href="https://www.goodreads.com/book/show/43822559-avenger-infinity-war---full-movie-hd-imdb-rank-20" class="rightItem"><button class="btn btn-outline-dark">IMDB</button></a>
//               <form class="completedbtn" action="/movies_and_series/3/complete" method="POST">
//                 <button class="btn btn-outline-success">Complete</button>
//               </form>
//             </div>
//             <p class="itemContext">Jan 26, 2019 ... Avenger Infinity War - Full Movie HD IMDB Rank #20. Watch this one of the best
// movie online for free via streaming.</p>
//           </div>
// `)

    // $('.movieSection').load('.movieSection');
  };
  // (name, link, context) complete href


  $('.bookSlide').click(() => {
    $('.bookSection').slideToggle();
  });

  $('.movieSlide').click(() => {
    $('.movieSection').slideToggle();
  });

  $('.prodSlide').click(() => {
    $('.prodSection').slideToggle();
  });

  $('.restSlide').click(() => {
    $('.restSection').slideToggle();
  });

  $('.miscSlide').click(() => {
    $('.miscSection').slideToggle();
  });

  $('.archiveSlide').click(() => {
    $('.archiveSection').slideToggle();
  });

});
