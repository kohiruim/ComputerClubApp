import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: {
          "sign in": "Sign in",
          "continue with google": "Continue with Google",
          "continue with github": "Continue with Github",
          "create username": "Create Username",
          "your fullname": "Your fullname",
          "add client": "Add client",
          email: "Email",
          role: "Role",
          save: "Save",
          "load more": "load more",
          username: "Username",
          fullname: "Fullname",
          balance: "Balance",
          clients: "Clients",
          total: "Total",
          search: "Search",
          reset: "Reset",
          "invalid email": "Invalid email",
          "only gmail": "Only gmail",
          "max length is": "Max length is",
          "min length is": "Min length is",
          "invalid username. Only lettern, numbers, -,_":
            "Invalid username. Only lettern, numbers, -,_",
          "client editing": "Client editing",
          "back to clients": "Back to clients",
          "balance cannot be negative": "Balance cannot be negative",
          Quizzes: "Quizzes",
          Questions: "Questions",
          "Test time": "Test time",
          min: "min",
          "Take the quiz": "Take the quiz",
          "Add Quiz": "Add Quiz",
          "Name of the quiz": "Name of the quiz",
          "Time of the quiz": "Time of the quiz",
          "Add picture": "Add picture",
          "Not specified": "Not specified",
        },
      },
      RU: {
        translation: {
          "sign in": "Войдите",
          "continue with google": "Продолжить с Google",
          "continue with github": "Продолжить c Github",
          "create username": "Придумай никнейм",
          "your fullname": "Твое имя",
          "add client": "Добавить клиента",
          email: "Почта",
          role: "Роль",
          save: "Сохранить",
          "load more": "загрузить еще",
          username: "Никнейм",
          fullname: "ФИО",
          clients: "Клиенты",
          total: "Всего",
          search: "Найти",
          reset: "Сбросить",
          balance: "Баланс",
          "invalid email": "Невалидная почта",
          "only gmail": "Только гугл почта",
          "max length is": "Максимальная длина",
          "min length is": "Минимальная длина",
          "invalid username. Only lettern, numbers, -,_":
            "Невалидный никнейм. Мб только буквы, цифры,-,_",
          "Client editing": "Редактирование клиента",
          "back to clients": "Назад к клиентам",
          "balance cannot be negative": "баланс не может быть отрицательным",
          Quizzes: "Викторины",
          Questions: "Вопросы",
          "Test time": "Время прохождения",
          min: "мин",
          "Take the quiz": "Пройти викторину",
          "Add Quiz": "Добавить викторину",
          "Name of the quiz": "Название викторины",
          "Time of the quiz": "Время викторины",
          "Add picture": "Добавить изображение",
          "Not specified": "Не указано",
        },
      },
    },
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
