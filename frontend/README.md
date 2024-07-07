# Aquaponic IoT Module Management Application

This application is designed to manage IoT modules that monitor water parameters in an aquaponic system. The main focus of the application is functionality and code quality, with aesthetics also considered. The backend code and instructions for running it are provided in the backend directory.

## Download and Installation

## Frontend

```bash
  git clone https://github.com/margsoftbf/recruitment-luna.git
  cd frontend
  npm i
  npm run dev
```

## Testing

```bash
 npm test
```

## Features

Module List Page
Each module displays:

- Name
- Availability
- Target Temperature
- Current Temperature (fetched via WebSocket)

Module Details Page
Information includes:

- Name
- Description
- Availability
- Target Temperature
- Current Temperature (fetched via WebSocket)
- Allows editing of module parameters if the module is available.
- Includes a button to return to the main list.
- Displays historical temperature data with options to view hourly or daily data.

## Screenshot

![App Screenshoot](https://github.com/margsoftbf/recruitment-luna/blob/main/frontend/public/assets/screenshot/Screenshot_1.png)
![App Screenshoot](https://github.com/margsoftbf/recruitment-luna/blob/main/frontend/public/assets/screenshot/Screenshot_2.png)
![App Screenshoot](https://github.com/margsoftbf/recruitment-luna/blob/main/frontend/public/assets/screenshot/Screenshot_3.png)
![App Screenshoot](https://github.com/margsoftbf/recruitment-luna/blob/main/frontend/public/assets/screenshot/Screenshot_4.png)