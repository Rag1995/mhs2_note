# -*- coding: utf-8 -*-

import pandas as pd

fold_path = r"./src/assets"

def crawler():
  #
  base_url = "https://docs.google.com/spreadsheets/u/0/d"
  workbook = "1ollm4cjdAGGQyMezr3UpumxlcKZhiF1RYh7K9EW_f7E"
  sheets = [
    { "id": "1510770429", "element": "無" },
    { "id": "414053052", "element": "火" },
    { "id": "1468231219", "element": "水" },
    { "id": "308477667", "element": "雷" },
    { "id": "351570235", "element": "冰" },
    { "id": "1687406532", "element": "龍" },
  ]
  # columns = ["類型", "基因名稱", "主/被動", "技能名稱", "所需等級", "消耗羈絆值", "技能詳情", "可持有隨行獸", "上下位"]
  columns = ["pattern", "gene", "type", "skill", "level", "cost", "description", "monster", "rank"]
  li = []
  #
  for sheet in sheets:
    #
    url = "{}/{}/export?format=csv&gid={}".format(base_url,workbook,sheet["id"])
    df = pd.read_csv(url)
    df.columns = columns
    df["element"] = df.apply(lambda row: sheet["element"], axis=1)
    li.append(df)
    #
  frame = pd.concat(li, axis=0, ignore_index=True)
  frame.to_pickle(fold_path+"/python/data.pkl")

def toJson():
  def monster_str(x):
    return x.replace(" ", "").replace("\n", "、").split("、")
  #
  df = pd.read_pickle(fold_path+"/python/data.pkl")
  df["monster"] = df["monster"].apply(lambda x: monster_str(x))
  df = df.explode("monster")
  #
  with open(fold_path+"/data/data.json", "w", encoding="UTF8") as file:
    df.to_json(file, orient="records", force_ascii=False)
  #
  monters = df.sort_values(by='monster', ascending=False)["monster"].drop_duplicates()
  with open(fold_path+"/data/monsters.json", "w", encoding="UTF8") as file:
    monters.to_json(file, orient="records", force_ascii=False)
  #
  genes = df.sort_values(by='gene', ascending=True)["gene"].drop_duplicates()
  with open(fold_path+"/data/genes.json", "w", encoding="UTF8") as file:
    genes.to_json(file, orient="records", force_ascii=False)

crawler() 
toJson()
