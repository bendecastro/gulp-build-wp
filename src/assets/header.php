<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php wp_title(); ?></title>
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <?php wp_head(); ?>
    </head>
    <body id="page-top" <?php body_class(); ?> >
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="wrapper mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header class="main-header mdl-layout__header mdl-layout__header--transparent">
                <div class="main-header-inner mdl-layout__header-row">
                    <!-- Title -->
                    <span class="mdl-layout-title">Title</span>
                    <!-- Add spacer, to align navigation to the right -->
                    <div class="mdl-layout-spacer"></div>
                    <!-- Navigation -->
                    <nav class="navigation mdl-navigation">
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                    </nav>
                </div><!-- /.main-header-inner -->
            </header>
            <div class="main-sidebar-container mdl-layout__drawer">
                <div class="main-sidebar">
                    <span class="mdl-layout-title">Title</span>
                    <nav class="navigation mdl-navigation">
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                        <a class="navigation-link rise-on-hover mdl-navigation__link" href="">Link</a>
                    </nav>
                </div><!-- /.main-sidebar-inner -->
            </div><!-- /.main-sidebar -->
