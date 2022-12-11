docker_compose('docker-compose.yml')
docker_build('tilt.dev/express-app', '.',
    live_update = [
        sync('.', '/var/www/app'),
        run('npm i', trigger='package.json'),
        # restart_container()
    ]
)