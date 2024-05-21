import LogoIcon from "../Components/Icons/LogoIcon";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react";

import OpenAI from "openai";

import * as API from "../api.js";

export default function HomeContents() {
  // const [ingredients, setIngredients] = useState<Array<string>>([
  //   "참다랑어",
  //   "김치",
  //   "참기름",
  // ]);
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [inputText, setInputText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<string>>([]);

  const search = useCallback(async (input: string) => {
    try {
      const result = await API.get(`ingredients?query=${input}`);
      setSearchResult(result.data?.result);
    } catch (err: any) {
      alert(err?.response?.data?.detail);
    }
    setInputText("");
  }, []);

  // useEffect(() => {
  // console.log(process.env.REACT_APP_OPENAI_API_KEY);
  // }, []);

  const queryWithGpt = useCallback(async () => {
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `다음 재료들을 이용한 레시피 추천해: ${ingredients.join(
            ","
          )}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    alert(completion.choices[0].message.content);
  }, [ingredients]);

  return (
    <Box
      className="centralize columnFlexbox"
      sx={{ width: "100%", backgroundColor: "#FFF", p: 3, height: "70vh" }}
    >
      <Box
        className="flexbox"
        id="search_and_logo_wrapper"
        // sx={{ display: "absolute", top: 0 }}
      >
        <Box
          className="circular centralize "
          sx={{ width: 80, aspectRatio: 1, backgroundColor: "#FFF", mr: 3 }}
        >
          <LogoIcon />
        </Box>
        <Box>
          <TextField
            id="glowTextfield"
            sx={{ width: "50vw" }}
            label="식재료를 찾아보세요"
            variant="outlined"
            value={inputText}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === "enter") {
                search(inputText);
              }
            }}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <Box>
            <Typography sx={{ color: "orange", fontWeight: "bold" }}>
              Welcome! 당신을 위한 AI 셰프, OSS19 입니다!
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        className="flexbox"
        sx={{ width: "100%", m: 3, p: 3, backgroundColor: "#DDD", mb: 0 }}
      >
        <Box sx={{ width: "10%" }}>
          <Typography sx={{ fontSize: 32, fontWeight: "bold" }}>
            선택된
            <br />
            재료들
          </Typography>
          {/* <Typography sx={{ fontSize: 24, fontWeight: "bold" }}></Typography> */}
        </Box>
        <Box
          className="flexbox columnFlexbox justifycenter"
          sx={{ width: "90%", height: "100%" }}
        >
          <Box>
            {ingredients.length > 0 ? (
              <Box sx={{ width: "100%" }}>
                <Box sx={{ mb: 1.5 }}>
                  {ingredients.map((ingredient) => (
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: "bold",
                        p: 1,
                        backgroundColor: "#FFF",
                        borderRadius: 10,
                        mr: 1,
                        display: "inline",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const target = ingredients.indexOf(ingredient);
                        setIngredients((prev) => [
                          ...ingredients.slice(0, target),
                          ...ingredients.slice(target + 1),
                        ]);
                      }}
                    >
                      {ingredient}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => {
                    queryWithGpt();
                  }}
                >
                  {/* <Typography> */}이 재료들을 사용하는 맛있는 레시피 만들기
                  {/* </Typography> */}
                </Button>
              </Box>
            ) : (
              <Typography
                className="outlinedtext"
                sx={{ color: "#555", fontSize: 48, fontWeight: "bold" }}
              >
                아직 선택된 재료가 없어요! 어떤 재료를 가지고 계신가요?
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box className="flexbox" sx={{ width: "100%", p: 3, height: "70%" }}>
        <Box sx={{ width: "10%" }}>
          <Typography sx={{ fontSize: 32, fontWeight: "bold" }}>
            검색된
            <br />
            재료들
          </Typography>
          {/* <Typography sx={{ fontSize: 24, fontWeight: "bold" }}></Typography> */}
        </Box>
        <Box
          className="flexbox columnFlexbox justifycenter"
          sx={{ width: "90%", height: "100%" }}
        >
          <Box
            className="flexbox"
            sx={{
              height: "100%",
              overflowY: "scroll",
              flexWrap: "wrap",
              pt: 1.5,
            }}
          >
            {searchResult.length > 0 &&
              searchResult.map((ingredient) => {
                if (ingredients.includes(ingredient)) {
                  return <></>;
                }
                return (
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      p: 0.5,
                      pl: 2,
                      pr: 2,
                      m: 0.5,
                      borderRadius: 10,
                      display: "inline",
                      cursor: "pointer",
                      color: "#FFF",
                      backgroundColor: "#000",
                      height: 30,
                    }}
                    onClick={(e: any) => {
                      setIngredients((prev) => [...prev, ingredient]);
                    }}
                  >
                    {ingredient}
                  </Typography>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
