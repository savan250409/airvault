<?php
// Local dev router for PHP's built-in server.
// Replicates api/.htaccess: forwards /api/<path> to api/index.php?url=<path>.
// Usage: php -S localhost:8090 router.php   (run from project root)

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (preg_match('#^/api/?(.*)$#', $uri, $m)) {
    $_GET['url'] = $m[1];
    chdir(__DIR__ . '/api');      // so relative require "db.php" etc. resolve
    require __DIR__ . '/api/index.php';
    return true;
}

// Anything else: let the built-in server handle static files, else 404.
return false;
