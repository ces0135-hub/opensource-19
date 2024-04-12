from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import csv

filename = "result.csv"
files = os.listdir()

if filename in files:
    os.remove(filename)

browser = webdriver.Chrome()
site_url = "https://sauce.foodpolis.kr/home/specialty/foodDbSearch.do?PAGE_MN_ID=SIS-030101"

browser.get(site_url)

script = """
        var entire = document.querySelectorAll("#content > div.boardGroup > div.conTableGroup.MAB30 > table > tbody > tr > td");
        var tds = Array.from(entire).filter((val, idx) => idx % 3 == 1);
        return tds.map((data) => {
            try {
                var childNodes = data.childNodes;
                var text = childNodes[0].text;
                return text;
            } catch (err) {
                return null;
            }
        });
        """

# results = []

# links = browser.find_elements(By.CLASS_NAME, "page-link")
# links[4].click()


with open('./result.csv', 'w+', newline='') as file:
    writer = csv.writer(file)
    lastResult = []
        
    for i in range(83):
        WebDriverWait(browser, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "page-link")))
        print(f"{i}/82")

        # links[7].click()
        # result = browser.execute_script(script)
        # print(result)
        # sleep(5)
        if i < 82:
            for i in range(2, 8):
                links = browser.find_elements(By.CLASS_NAME, "page-link")
                links[i].click()
                # sleep(0.5)
                result = browser.execute_script(script)
                # print(type(result))
                if result == lastResult:
                    print("[WARN]Duplicated: Skip this step")
                else: 
                    print(result)
                    writer.writerow(result)
                    # results.append(result)
                lastResult = result
        elif i == 82:
            for i in range(2, 4):
                links = browser.find_elements(By.CLASS_NAME, "page-link")
                links[i].click()
                result = browser.execute_script(script)
                if result == lastResult:
                    print("[WARN]Duplicated: Skip this step")
                else: 
                    print(result)
                    writer.writerow(result)
                    # results.append(result)
                lastResult = result
                # sleep(0.5)
        else:
            print(f"index is {i}, not set yet")

        # print(results)

    # sleep(10)
    # print(results)
