<?php
/*
Plugin Name: Memory Game
Description: This is a game to test your memory
Version: 1
Author: Eben Shapiro
Author URI: http://ebenshapiro.com
License: GPLv2 or later
*/

function memory_display()
{
	echo '<div id="memory"></div>';
}

add_shortcode('Memory Game', 'memory_display' );
add_action('wp_print_styles', 'add_memory_style');
add_action('init', 'my_init_method');
  
function add_memory_style() {
	$myStyleUrl = WP_PLUGIN_URL . '/memory/style.css';
        $myStyleFile = WP_PLUGIN_DIR . '/memory/style.css';
        if ( file_exists($myStyleFile) ) {
            wp_register_style('myMemoryStyle', $myStyleUrl);
            wp_enqueue_style( 'myMemoryStyle');
        }
}

function my_init_method() {
    wp_register_script( 'memoryGame', WP_PLUGIN_URL  . '/memory/memory.js', 'jquery');
	
	$thing=WP_PLUGIN_URL  . '/memory/';
    	wp_enqueue_script( 'jquery' );

	wp_enqueue_script( 'memoryGame' );

	$params = array(
	  'absUrl' => $thing,

	);
	wp_localize_script( 'memoryGame', 'memParams', $params );
}    
 
?>
