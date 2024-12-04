# Project

## Overview

This project is a web application built with Node.js, Express, and Sequelize for managing medical records.

## Project Structure

## Installation

1. Clone the repository:
    ```sh
    git clone <https://github.com/luongtrz/ClinicManagement.git>
    ```

2. Navigate to the project directory:
    ```sh
    cd project
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add your database configuration:
    ```
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    PORT=3000
    ```
Contact 22120199 email hcmus to obtain keys values

## Usage with frontend
1. cd views
    ```sh
    npm run build:css
    ```

2. Go live server or something like that to run index.html

## Usage with backend
1. Start the development server:
    ```sh
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Models

- `BacSi` - Doctors
- `BenhNhan` - Patients
- `CachDung` - Usage methods for medicines
- `CachDungThuoc` - Medicine usage methods
- `CanLamSang` - Clinical tests
- `DonViTinh` - Units of measurement
- `HoaDon` - Invoices
- `LoaiBenh` - Disease types
- `LoaiBenhTrongPhieuKham` - Disease types in medical records
- `PhieuKhamBenh` - Medical records
- `QuyDinh` - Regulations
- `TaiKhoan` - Accounts
- `Thuoc` - Medicines
- `ToaThuoc` - Prescriptions

## License

This project is licensed under the ISC License.