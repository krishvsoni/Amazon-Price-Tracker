import os
import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
from datetime import datetime
import pymongo

load_dotenv()

def get_data():
    options = Options()
    options.add_argument('--headless')
# Remove --headless for page view of data
    api_key = os.getenv('API_KEY')
    scraperapi_url = f'http://api.scraperapi.com/?api_key={api_key}&url='
    user_agent = os.getenv('user_agent')

    with open('products.txt') as f:
        products = f.readlines()

    driver = webdriver.Chrome(options=options)

    for product in products:
        product = product.strip()  
        url = scraperapi_url + product
        # For Amazon India Only  driver.get(f'https://www.amazon.in/dp/{product}')
        page_source = driver.page_source

        with open(f'data/{product}.html', 'w', encoding='utf-8') as f:
            f.write(page_source)

    driver.quit()

def extract_data():
    data_list = []

    client = pymongo.MongoClient(os.getenv('MongoDB'))
    db = client["amazon_data"]
    collection = db["products"]

    files = os.listdir('data')
    for file in files:
        file_path = os.path.join('data', file)

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            soup = BeautifulSoup(content, 'html.parser')

            title = soup.title.text.split(":")[0] if soup.title else None
            time = datetime.now()

            price_int = ""
            price = soup.find(class_="a-price-whole")
            if price:
                price_text = re.sub(r'[^\d\-+\.]', '', price.get_text())
                try:
                    price_int = int(price_text.replace(',', '').replace('.', ''))
                except ValueError:
                    print(f"Error: Price cannot be converted to integer for {title}")

            asin = ""
            table = soup.find(id="productDetails_detailBullets_sections1")
            if table:
                asin = table.find(class_="prodDetAttrValue").text

            data = {
                "title": title,
                "time": time,
                "price": price_int,
                "asin": asin
            }
            collection.insert_one(data)

        except FileNotFoundError:
            print(f"Error: File {file_path} not found")

if __name__ == '__main__':
    get_data()
    extract_data()
