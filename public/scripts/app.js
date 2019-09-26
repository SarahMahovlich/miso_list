// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });



$(document).ready(function() {
// $().load();

  const buildElement = function(href, name, link, context) {
    let externalbuttonname = '';
    let section = '';
    console.log('build element')
    if (link.includes('products')) {
      externalbuttonname = 'Amazon';
      section = '.productSection';
    }
    if (link.includes('misc')) {
      externalbuttonname = '';
      section = '.miscSection';
    }
    if (link.includes('books')) {
      externalbuttonname = 'goodreads';
      section = '.bookSection';
    }
    if (link.includes('imbd')) {
      console.log('link include imbd');
      externalbuttonname = 'Imbd';
      section = '.movieSection';
    }
    if (link.includes('restaurants')) {
      externalbuttonname = 'Zomato';
      section = '.restaurantSection';
    }
    // href = query db for /:table/:id
    // let href = '/products/2';
// section should be table name
    $(section).after(
      `<div class="toDoList">
        <div class="itemHeader">
          <a href="${href}" class="leftItem itemTitleHeader"><h4>${name}</h4></a><br>
          <a href="${link}" class="rightItem"><button class="btn btn-outline-dark">${externalbuttonname}</button></a>
          <form class="completedbtn" action="/products/2/complete" method="POST">
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
  // (href, name, link, context)
  buildElement('/products/2', 'generation test', 'www.imbd.com', 'context');





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
