import sys
import requests
from bs4 import BeautifulSoup
import io

def get_second_news_image_and_headline():
    # 네이버 뉴스 검색 URL
    url = f"https://search.naver.com/search.naver?where=news&query=강아지"

    # HTTP 요청 보내기
    response = requests.get(url)

    # 응답 받은 HTML 파싱
    soup = BeautifulSoup(response.text, 'html.parser')

    # 뉴스 탭으로 이동하여 해당 페이지의 두 번째 뉴스의 이미지와 헤드라인 가져오기
    second_news = soup.select('.news_area a.news_tit')[0]

    if second_news:
        # 두 번째 뉴스의 URL
        news_url = second_news['href']

        # 뉴스 페이지로 이동하여 이미지와 헤드라인 가져오기
        news_response = requests.get(news_url)
        news_soup = BeautifulSoup(news_response.text, 'html.parser')

        # 이미지 가져오기
        news_image_tag = news_soup.find('meta', property='og:image')
        news_image_url = news_image_tag['content'] if news_image_tag else "이미지 없음"

        # 헤드라인 가져오기
        news_headline = second_news.text

        return news_image_url, news_headline, news_url
    else:
        return "뉴스를 찾을 수 없습니다.", "", ""

if __name__ == "__main__":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    news_image_url, news_headline, news_url = get_second_news_image_and_headline()
    print(news_image_url)
    print(news_headline)
    print(news_url)