#!/bin/bash

# sysopctl v0.1.0 - A Linux system resource and service management tool

# Help and Version Options
if [[ $1 == "--help" ]]; then
  echo "Usage: sysopctl [COMMAND] [OPTIONS]"
  echo "Commands:"
  echo "  service list            List all running services"
  echo "  service start <name>    Start a specific service"
  echo "  service stop <name>     Stop a specific service"
  echo "  system load             View system load averages"
  echo "  disk usage              Check disk usage"
  echo "  process monitor         Monitor system processes"
  echo "  logs analyze            Analyze system logs"
  echo "  backup <path>           Backup system files"
  exit 0
elif [[ $1 == "--version" ]]; then
  echo "sysopctl v0.1.0"
  exit 0
fi

# Section 1: List Running Services
if [[ $1 == "service" && $2 == "list" ]]; then
  systemctl list-units --type=service
  exit 0
fi

# Section 2: Start/Stop Services
if [[ $1 == "service" && $2 == "start" ]]; then
  systemctl start $3
  echo "Started service: $3"
  exit 0
elif [[ $1 == "service" && $2 == "stop" ]]; then
  systemctl stop $3
  echo "Stopped service: $3"
  exit 0
fi

# Section 3: View System Load
if [[ $1 == "system" && $2 == "load" ]]; then
  uptime
  exit 0
fi

# Section 4: Disk Usage
if [[ $1 == "disk" && $2 == "usage" ]]; then
  df -h
  exit 0
fi

# Section 5: Monitor Processes
if [[ $1 == "process" && $2 == "monitor" ]]; then
  top
  exit 0
fi

# Section 6: Analyze System Logs
if [[ $1 == "logs" && $2 == "analyze" ]]; then
  journalctl -p crit
  exit 0
fi

# Section 7: Backup Files
if [[ $1 == "backup" ]]; then
  rsync -av --progress $2 /backup/location/
  echo "Backup of $2 initiated."
  exit 0
fi

# Invalid command handling
echo "Invalid command. Use 'sysopctl --help' for available commands."
