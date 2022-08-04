module.exports = {
    apps: [
      {
        name: 'api-primary',
        exec_mode: 'cluster',
        instances: '1',
        script: './dist',
        args: 'start',
        exp_backoff_restart_delay: 100,
        max_memory_restart: "2G",
      },
      {
        name: 'api-replica',
        exec_mode: 'cluster',
        instances: '-1',
        script: './dist',
        args: 'start',
        exp_backoff_restart_delay: 100,
        max_memory_restart: "2G",
      }
    ],
  }