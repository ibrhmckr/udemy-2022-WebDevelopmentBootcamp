
$("h1").addClass("big-title margin-50");



$("h1").before("<button>Before</button>");

$("h1").after("<button>After</button>");

$("h1").prepend("<button>Prepend</button>");

$("h1").append("<button>Append</button>");
$("button").on("click", function(){
   $("h1").slideUp().slideDown().animate({opacity: 0.5})
});
