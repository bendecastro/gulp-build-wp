<?php

function register_site_menus() {
  register_nav_menus( array(
    'main_menu' => 'Main Menu'
  ));
}
add_action('init','register_site_menus');


function site_css() {
  wp_enqueue_style( 'main_css', get_template_directory_uri().'/css/main-style.css');
}
add_action( 'wp_enqueue_scripts', 'site_css' );

function site_scripts() {
  wp_enqueue_script( 'app_js', get_template_directory_uri().'/js/main-app.js',  '', '', true );
}
add_action( 'wp_enqueue_scripts', 'site_scripts' );