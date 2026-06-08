<?php
/**
 * Enrutador mínimo para el sitio estático servido en Cloudways (stack nginx).
 *
 * nginx hace: try_files $uri $uri/ /index.php
 *   → las páginas reales (index.html de cada carpeta) se sirven como ESTÁTICOS
 *     y nunca llegan a este archivo.
 *   → sólo las rutas que NO existen caen aquí, y devolvemos el 404 propio con
 *     el código de estado 404 correcto (no un "soft 404").
 *
 * Este archivo debe vivir en la raíz del webroot (la carpeta dist/ desplegada).
 */
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

// Según el orden de DirectoryIndex, nginx podría servir este index.php para la
// home; en ese caso devolvemos la home estática.
if ($path === '/' || $path === '/index.php') {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/index.html');
    exit;
}

// Cualquier otra ruta que llegue hasta aquí no existe como archivo → 404 real.
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/404.html');
