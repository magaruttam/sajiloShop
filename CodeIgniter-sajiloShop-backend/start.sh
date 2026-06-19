#!/bin/bash
php -S localhost:8000 "$(dirname "$0")/router.php"
