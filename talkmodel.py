import sys #파이썬내장모듈
import pandas as pd
import json#파이썬내장모듈
from sentence_transformers import SentenceTransformer #pip인스톨sentence_transformers
from sklearn.metrics.pairwise import cosine_similarity 

def cached_model():
    model = SentenceTransformer('jhgan/ko-sroberta-multitask')
    return model
model = cached_model()

def get_dataset():
    df = pd.read_csv('wellness_dataset.csv')
    df['embedding'] = df['embedding'].apply(json.loads)
    return df
df = get_dataset()

def getName(user_input):
    embedding = model.encode(user_input)    
    df['distance'] = df['embedding'].map(lambda x: cosine_similarity([embedding], [x]).squeeze())
    answer = df.loc[df['distance'].idxmax()] # 최댓값을 구해서 답변 뽑기
    print(answer[2])   #print( answer['챗봇'])  #print(user_input[0],user_input[1])
    #print(answer['챗봇'])
    
if __name__ == '__main__':
    getName(sys.argv[1])