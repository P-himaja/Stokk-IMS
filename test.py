import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Setup the Selenium WebDriver (Change the executable_path if needed)
driver = webdriver.Chrome(executable_path='path/to/chromedriver')

# Test Case 1: Open the Dashboard
def test_open_dashboard():
    driver.get("file:///path/to/your/index.html")  # Change this to your HTML file path
    assert "Stockk Dashboard" in driver.title
    print("Test Case 1 Passed: Dashboard opened successfully.")

# Test Case 2: Add a Product
def test_add_product():
    driver.get("file:///path/to/your/index.html")
    
    add_product_btn = driver.find_element(By.ID, "addProductBtn")
    add_product_btn.click()
    
    product_name_input = driver.find_element(By.ID, "product-name")
    product_desc_input = driver.find_element(By.ID, "product-desc")
    save_product_btn = driver.find_element(By.ID, "saveProductBtn")
    
    product_name_input.send_keys("Test Product")
    product_desc_input.send_keys("This is a test product.")
    save_product_btn.click()
    
    time.sleep(1)  # Wait for the product list to update
    product_list = driver.find_element(By.ID, "product-list")
    assert "Test Product" in product_list.text
    print("Test Case 2 Passed: Product added successfully.")

# Test Case 3: Edit a Product
def test_edit_product():
    driver.get("file:///path/to/your/index.html")
    
    # Assuming the product is already added; locate the edit button
    edit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Edit')]")
    edit_button.click()
    
    product_name_input = driver.find_element(By.ID, "product-name")
    product_desc_input = driver.find_element(By.ID, "product-desc")
    save_product_btn = driver.find_element(By.ID, "saveProductBtn")
    
    product_name_input.clear()
    product_name_input.send_keys("Updated Test Product")
    product_desc_input.clear()
    product_desc_input.send_keys("This is an updated test product.")
    save_product_btn.click()
    
    time.sleep(1)  # Wait for the product list to update
    product_list = driver.find_element(By.ID, "product-list")
    assert "Updated Test Product" in product_list.text
    print("Test Case 3 Passed: Product edited successfully.")

# Test Case 4: Delete a Product
def test_delete_product():
    driver.get("file:///path/to/your/index.html")
    
    # Assuming the product is already added; locate the delete button
    delete_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Delete')]")
    delete_button.click()
    
    time.sleep(1)  # Wait for the product list to update
    product_list = driver.find_element(By.ID, "product-list")
    assert "Updated Test Product" not in product_list.text
    print("Test Case 4 Passed: Product deleted successfully.")

# Test Case 5: Profile Button Visibility
def test_profile_button_visibility():
    driver.get("file:///path/to/your/index.html")
    profile_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Profile')]")
    assert profile_btn.is_displayed()
    print("Test Case 5 Passed: Profile button is visible.")

# Run the test cases
if __name__ == "__main__":
    test_open_dashboard()
    test_add_product()
    test_edit_product()
    test_delete_product()
    test_profile_button_visibility()
    
    driver.quit()  # Close the browser after the tests