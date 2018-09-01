To use 12 grid, place this HTML in container you want to divide / 12	
Make sure container is not positioned static 

<!-- 12 GRID  -->
		  <div class='grid grid_bar_1'></div>
		  <div class='grid grid_bar_2'></div>
		  <div class='grid grid_bar_3'></div>
		  <div class='grid grid_bar_4'></div>
		  <div class='grid grid_bar_5'></div>
		  <div class='grid grid_bar_6'></div>
		  <div class='grid grid_bar_7'></div>
		  <div class='grid grid_bar_8'></div>
		  <div class='grid grid_bar_9'></div>
		  <div class='grid grid_bar_10'></div>
		  <div class='grid grid_bar_11'></div>
		  <div class='grid grid_bar_12'></div>




Add CSS: 

.grid{
		position: absolute;
		height: 100%;
		width: 2px;
		background-color: red;
		top: 0;
		/*display: none;  */ 
	}

	/* Uncomment display:none to hide grid */


	.grid_bar_1{left:8.33%;}
	.grid_bar_2{left:16.7%;}
	.grid_bar_3{left:25%;}
	.grid_bar_4{left:33.33%;}
	.grid_bar_5{left:41.66%;}
	.grid_bar_6{left:50%;}
	.grid_bar_7{left:58.33%;}
	.grid_bar_8{left:66.7%;}
	.grid_bar_9{left:75%;}
	.grid_bar_10{left:83.33%;}
	.grid_bar_11{left:91.33%;}
	.grid_bar_12{left:99.75%;}


