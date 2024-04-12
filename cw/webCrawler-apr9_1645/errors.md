# Errors

## stale-element-reference-exception

```sh
Traceback (most recent call last):
  File "{MY_PATH}/webCrawler/main.py", line 43, in <module>
    links[i].click()
  File "{MY_PATH}/webCrawler/venv/lib/python3.9/site-packages/selenium/webdriver/remote/webelement.py", line 94, in click
    self._execute(Command.CLICK_ELEMENT)
  File "{MY_PATH}/webCrawler/venv/lib/python3.9/site-packages/selenium/webdriver/remote/webelement.py", line 395, in _execute
    return self._parent.execute(command, params)
  File "{MY_PATH}/webCrawler/venv/lib/python3.9/site-packages/selenium/webdriver/remote/webdriver.py", line 347, in execute
    self.error_handler.check_response(response)
  File "{MY_PATH}/webCrawler/venv/lib/python3.9/site-packages/selenium/webdriver/remote/errorhandler.py", line 229, in check_response
    raise exception_class(message, screen, stacktrace)
selenium.common.exceptions.StaleElementReferenceException: Message: stale element reference: stale element not found
  (Session info: chrome=123.0.6312.107); For documentation on this error, please visit: https://www.selenium.dev/documentation/webdriver/troubleshooting/errors#stale-element-reference-exception
Stacktrace:
0   chromedriver                        0x00000001026ac474 chromedriver + 4326516
1   chromedriver                        0x00000001026a493c chromedriver + 4294972
2   chromedriver                        0x00000001022d0088 chromedriver + 278664
3   chromedriver                        0x00000001022dddb8 chromedriver + 335288
4   chromedriver                        0x00000001022d5370 chromedriver + 299888
5   chromedriver                        0x00000001022d3c14 chromedriver + 293908
6   chromedriver                        0x00000001022d6428 chromedriver + 304168
7   chromedriver                        0x00000001022d64a0 chromedriver + 304288
8   chromedriver                        0x0000000102314450 chromedriver + 558160
9   chromedriver                        0x0000000102309264 chromedriver + 512612
10  chromedriver                        0x0000000102308dd0 chromedriver + 511440
11  chromedriver                        0x000000010234b4f8 chromedriver + 783608
12  chromedriver                        0x00000001023074e4 chromedriver + 505060
13  chromedriver                        0x0000000102307f5c chromedriver + 507740
14  chromedriver                        0x000000010266fa10 chromedriver + 4078096
15  chromedriver                        0x00000001026747c8 chromedriver + 4097992
16  chromedriver                        0x00000001026565b4 chromedriver + 3974580
17  chromedriver                        0x00000001026750e0 chromedriver + 4100320
18  chromedriver                        0x0000000102647ba4 chromedriver + 3914660
19  chromedriver                        0x00000001026956e8 chromedriver + 4232936
20  chromedriver                        0x0000000102695864 chromedriver + 4233316
21  chromedriver                        0x00000001026a45b0 chromedriver + 4294064
22  libsystem_pthread.dylib             0x0000000181c41034 _pthread_start + 136
23  libsystem_pthread.dylib             0x0000000181c3be3c thread_start + 8
```

### 원인

- 페이지가 리디렉션 되면서, 기존 Class name으로 참고한 element가 DOM 에서 사라짐

- 따라서 `.click()` 메소드 실행 실패

### 해결

- 모든 for loop에서 class name으로 element를 재정의

## 데이터 중복 오류

- 식재료 데이터베이스가 제공하는 자료가 총 4,200여 개인 데 반해, 크롤링된 데이터의 전체 갯수가 5,800여개임을 보고 점검함

- 크롤링 중, 페이지네이션 버튼을 2번째에서 7번째까지 클릭하도록 함

  - 버튼들은 [가장 처음, 이전 5개, 5n+1번째, 5n+2번째, 5n+3번째, 5n+4번째, 5n번째, 다음 5개, 마지막] 순서임

  - 따라서, 2번째에서 7번째 버튼을 클릭하는 건 모든 페이지를 크롤하고, 다음 5개로 액세스하는 과정

### 원인

- 7번째 버튼 '다음 5개'를 누르면, 다음 5개의 첫 번째 페이지로 액세스하고, 크롤링함

- 이후 2번째 버튼을 누르는데, 이는 자동으로 이동된 첫 페이지와 같은 곳임

- 따라서 5번마다 한 번씩, 첫 번째 페이지의 데이터가 중복 크롤링됨

### 해결

- lastResult를 저장하고, 현재 결과와 비교해 같을 경우 해당 Step을 넘어가도록 함
