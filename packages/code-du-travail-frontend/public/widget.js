function addWidget() {
  const target = document.querySelector("#cdtn-widget");
  let iframe = document.getElementById("iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    target.insertAdjacentElement("afterbegin", iframe);
  }
  const isIE = /MSIE/.test(window.navigator.userAgent);
  iframe.id = "cdtn-iframe";
  iframe.width = "100%";
  iframe.width = "250px";
  iframe.style = "border:none";

  iframe.src = isIE
    ? `javascript:
<script>
  window.onload = function() { document.domain = "domain.io"}
</script>`
    : "about:blank";

  const widget = `
  <div id="root">
    <style>
      * {
        box-sizing: border-box;
      }
      html, body {
        margin: 0;
        overflow: hidden;
      }
      @font-face {
        font-family: "Merriweather";
        src: url(data:font/woff;charset=utf-8;base64,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) format("woff2");
        font-weight: 300;
        font-style: normal;
      }

      #root {
        max-width: 34rem;
        padding: 1.7rem 1.4rem;
        color: #3e486e;
        line-height:1.5;
        text-align: center;
        background: white;
      }

      #cdtn-logo {
        width: 40%;
        min-width: 6rem;
        max-width: 10rem;
        color: #f66663;
      }

      label {
        display: block;
        margin: .5rem 0 1rem;
        font-family: Merriweather,sans-serif;
        font-size: 1.125em;
      }

      #search-bar {
        position: relative;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        background: white;
        border-radius:0.6rem;
        box-shadow: rgba(121, 148, 212, 0.4) 0 0.8rem 1.4rem;
      }

      #search-logo {
        position: absolute;
        z-index: 0;
        height: 20px;
        left: 1rem;
        top: calc(50% - 10px);
      }

      input {
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 2rem 4rem 2rem 5.2rem;
        height: 4rem;
        width:100%;
        color: #3e486e;
        font-weight: normal;
        font-size: 1rem;
        font-style: normal;
        line-height: 1;
        -webkit-appearance: none;
        background-color: transparent;
        border: none;
        border-radius:0.6rem;
      }

      button {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        padding: 0 0.8rem;
        height:100%;
        display: flex;
        align-items: center;
        color: rgb(121, 148, 212);
        cursor: pointer;
        background: transparent;
        border: none;
        box-shadow: none;
        opacity: 1;
        transition: all 100ms ease-out;
        -webkit-appearance: none;
      }

      button:hover {
        opacity: 0.5;
        transform: translateY(-2px);
      }
      button svg {
        width: 2rem;
        height: 2rem;
      }
      @media (max-width: 300px) {
        body {
          font-size: 0.8125rem;
        }
        #root {
          padding: 1.5rem 1rem;
          line-height:1.3;
        }
        #search-bar {
          box-shadow: rgba(121, 148, 212, 0.4) 0 0.5rem 1rem;
        }
        #search-logo {
          height: 14px;
          left: .5rem;
          top: calc(50% - 7px);
        }
        input {
          height: 3.5rem;
          padding: 0.5rem 2.6rem 0.5rem 3.4rem;
        }
        button {
          padding: 0 .5rem;
        }
        button svg {
          width: 24px;
          height: 24px;
        }
      }
    </style>
    <a href="https://code.travail.gouv.fr?source=widget" target="_blank" title="Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail.">
      <img
        id="cdtn-logo"
        alt="Le Code du travail numérique"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA2NTcgMjY1Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTM1IDE2MGg1MjB2MTAwSDEzNXoiLz48cGF0aCBmaWxsPSIjZjY2NjYzIiBkPSJNNTMzLjAyNiAxNTkuMTZILjgyMlY3OS44MjRoNTMyLjIwNHY3OS4zMzZ6bS0uMTA3LTc5LjMzNkgyNjQuOThWLjQ4OGgyNjcuOTM5djc5LjMzNnpNMjEwLjA5IDE4Ni4zMjlsLS4xNTUgNTQuMzU5aC0xMS42MTZsLTEwLjY4NS0xNi4zMzljLS4xNTUtLjI1OS0xLjMxNi0xLjkzNi0zLjQ4NC01LjAzNC0uNTY4LS44MjYtMS42NzctMi41MDMtMy4zMjktNS4wMzNhOTkuMjAxIDk5LjIwMSAwIDAwLTIuNTU2LTMuNzkzbC0xLjAwNy0xLjU1MWgtLjE1NWwuMDc4IDEuMzk2Yy4wNTIuMzYyLjA5IDEuMDA3LjExNiAxLjkzNi4wMjYuOTI4LjAzOCAxLjYyNC4wMzggMi4wOS4xMDQgMS43NTQuMTgyIDMuODQ2LjIzMiA2LjI3MS4wNTIgMS42MDIuMDc5IDQuMjU5LjA3OSA3Ljk3NnYxMS45MjRoLTEyLjYyM3YtNTQuMTI0aDExLjYxNmwxMS4zMDQgMTcuMTEzIDIuNzg4IDQuMTgxYy4xMDQuMTU0IDEuMTYyIDEuNzA0IDMuMTc1IDQuNjQ1LjI1OS40MTQuNjcyIDEuMDQ2IDEuMjM5IDEuODk4YTQ0LjcyOCA0NC43MjggMCAwMDEuMzE3IDEuODk3bDEuMDg0IDEuNTQ4aC4wNzd2LTUuNjUyYzAtMi40NzctLjAyNi00LjQ5MS0uMDc3LTYuMDQtLjA1Mi0xLjU0OC0uMDc3LTMuOTc1LS4wNzctNy4yNzl2LTEyLjM4OWgxMi42MjF6bTU3LjM4IDB2MzEuMzZjMCAzLjgyMS0uNTQzIDcuMjAxLTEuNjI3IDEwLjE0NC0xLjA4NCAyLjk5NS0yLjU4MSA1LjQ3My00LjQ5MSA3LjQzNS0xLjk2MSAyLjAxMi00LjMxIDMuNTYxLTcuMDQ2IDQuNjQ1LTIuODM5IDEuMDMyLTUuOTM2IDEuNTQ4LTkuMjkyIDEuNTQ4LTMuMzU1IDAtNi40NTItLjUxNi05LjI5Mi0xLjU0OC0yLjczNi0xLjA4NC01LjA4Ni0yLjYzMy03LjA0Ny00LjY0NS0xLjkwOS0xLjk2Mi0zLjQwNy00LjQ0LTQuNDkxLTcuNDM1LTEuMDg0LTIuOTQzLTEuNjI2LTYuMzIzLTEuNjI2LTEwLjE0NHYtMzEuMzZoMTIuNzc3djMxLjI4M2MwIDQuMTMuODI1IDcuMTc2IDIuNDc3IDkuMTM3IDEuNiAxLjkxMSA0LjAwMiAyLjg2NSA3LjIwMiAyLjg2NSAzLjIwMSAwIDUuNjAxLS45NTQgNy4yMDEtMi44NjUgMS42NTItMS45NjEgMi40NzctNS4wMDcgMi40NzctOS4xMzd2LTMxLjI4M2gxMi43Nzh6bTYzLjE4NiAwbC0uMTU1IDU0LjM1OWgtMTIuMzg5di0xNC4zMjZjMC01LjYyNy4xMjgtMTAuMTk2LjM4Ny0xMy43MDYuMDUyLTEuMDMxLjEwNC0xLjkxLjE1NC0yLjYzMi4wNTItLjcyMy4wNzgtMS4yNjQuMDc4LTEuNjI2di0uNTQyaC0uMDc4bC0uNjE4IDEuMDgyYy0uNTE2LjkzLS45NTYgMS43NTctMS4zMTggMi40OGwtMS4zOTMgMi43ODctMS4wMDcgMi4wMTMtNS44ODUgMTAuOTk2aC02LjQyN2wtNS44ODUtMTAuOTk2YTI3LjE3NyAyNy4xNzcgMCAwMC0uOTI5LTIuMDEzbC0xLjM5NC0yLjc4N2E2NS41NyA2NS41NyAwIDAwLTEuMzE2LTIuNDhsLS42Mi0xLjA4MmgtLjE1NGMtLjA1MiAwLS4wNTIuMzg4IDAgMS4xNjFzLjEyOSAxLjk2My4yMzIgMy41NjFjLjI1OCAzLjUxMS4zODggOC4wOC4zODggMTMuNzA3djE0LjMyNGgtMTIuMzEydi01NC4xMjRoMTEuOTI0bDkuMjkyIDE2LjQxNWMxLjY1MiAyLjk5NCAyLjczNiA1LjEzNyAzLjI1MyA2LjQyOC40NjQgMS4yMzguNzIzIDEuODU4Ljc3MyAxLjg1OGguMDc4bC4xNTQtLjQ2N2MuMDUyLS4xMDIuMjU5LS41OTEuNjItMS40NjkuNDE0LS45MjkuODI3LTEuODA4IDEuMjM5LTIuNjMzYTQ3LjY1NCA0Ny42NTQgMCAwMTIuMDkxLTMuODcybDkuMjkyLTE2LjQxNmgxMS45MjV6bTI3LjE4MS0yLjI0NmwtMy44NzItNi43MzYgMTcuMjY4LTkuNzU2IDQuNTY5IDguNTkzLTE3Ljk2NSA3Ljg5OXptMjMuMDc0IDQ0LjM2OXYxMi4wOGgtMzYuOTM0di01NC4yMDRoMzYuNDd2MTIuMDA0aC0yMy43NzJ2OS4wNTloMTguMzUydjExLjMwNWgtMTguMzUydjkuNzU2aDI0LjIzNnptMjUuMzIzLTE3LjAzNWw3Ljc0NC4xNTVjMS4wMzIgMCAxLjk2MS0uMjA3IDIuNzg3LS42MTlhNS4zNSA1LjM1IDAgMDAxLjg1OC0xLjU0OWMuNTE2LS42NzEuODc4LTEuMzY4IDEuMDg0LTIuMDkxLjI1OS0uODc3LjM4Ny0xLjY3OC4zODctMi40MDEgMC0uNzIzLS4xMjgtMS41MjMtLjM4Ny0yLjQtLjIwNi0uNzIzLS41NjgtMS40Mi0xLjA4NC0yLjA5MWE1LjMzIDUuMzMgMCAwMC0xLjg1OC0xLjU0OWMtLjgyNi0uNDEyLTEuNzU1LS42MTktMi43ODctLjYxOWgtNy43NDR2MTMuMTY0em0xNC45NDUgMjkuMTkybC05LjI5Mi0xNy41NzdoLTUuNzN2MTcuNjU1aC0xMi42OTl2LTU0LjEyNmgxOS4yMDNjMy4wNDYgMCA1Ljg4NS40MzkgOC41MTggMS4zMTYgMi41My44MjcgNC42OTggMi4wNjYgNi41MDQgMy43MThhMTcuMjM4IDE3LjIzOCAwIDAxNC4xODIgNS44MDhjLjk4IDIuMTY2IDEuNDcgNC42OTYgMS40NyA3LjU4OCAwIDMuNjY1LS44IDYuNzg4LTIuNCA5LjM2OS0xLjYgMi42MzItMy44NzIgNC42NzItNi44MTMgNi4xMTdsMTEuMzA0IDIwLjEzMmgtMTQuMjQ3em0yMy45MjgtNTQuMjhoMTIuNjk5djU0LjIwM2gtMTIuNjk5di01NC4yMDN6bTU3LjY4OSAzOC42MzljMi4yMi0yLjczNiAzLjMyOS02LjYwOCAzLjMyOS0xMS42MTQgMC01LjA1OS0xLjEwOS04LjkzMS0zLjMyOS0xMS42MTYtMi4yNzItMi43MzUtNS4zMTgtNC4xMDMtOS4xMzgtNC4xMDMtMy44NzIgMC02Ljg5MiAxLjM2OC05LjA2IDQuMTAzLTIuMTY4IDIuNzM2LTMuMjUyIDYuNjA4LTMuMjUyIDExLjYxNiAwIDQuOTU2IDEuMDg0IDguODI4IDMuMjUyIDExLjYxNCAyLjE2OCAyLjc4NyA1LjE4OCA0LjE4MiA5LjA2IDQuMTgyIDMuODIgMCA2Ljg2Ni0xLjM5NSA5LjEzOC00LjE4MnptLTE1LjQ4NyAxNS43OTZsLS4wNzcuMzExYy0yLjczNi0uNTY4LTUuMzctMS42NzktNy44OTktMy4zMjktMi4zMjMtMS40OTgtNC4zNjEtMy40ODYtNi4xMTctNS45NjMtMS43MDQtMi40MjctMy4wMi01LjEzNy0zLjk1LTguMTMyLS45MjgtMi45OTMtMS4zOTMtNi4zMjMtMS4zOTMtOS45ODggMC00LjMzNi42NDUtOC4yMDggMS45MzYtMTEuNjE1IDEuMjkxLTMuNDU4IDMuMDcyLTYuNDI2IDUuMzQzLTguOTA1YTIxLjk5NSAyMS45OTUgMCAwMTguMTMtNS43MjkgMjYuNTE5IDI2LjUxOSAwIDAxMTAuMjIyLTIuMDE0YzMuNjY1IDAgNy4wNzIuNjcxIDEwLjIyMSAyLjAxNCAzLjE0OSAxLjM0MiA1Ljg1OSAzLjIyNiA4LjEzMSA1LjY1MiAyLjI3IDIuNDI2IDQuMDc3IDUuMzk0IDUuNDIgOC45MDQgMS4yOSAzLjQwOCAxLjkzNiA3LjI4IDEuOTM2IDExLjYxNiAwIDMuNjEzLS40NjYgNi45NjktMS4zOTUgMTAuMDY1LS45MjkgMy4wOTctMi4yNDUgNS44MDgtMy45NDggOC4xMzJhMjQuNjI0IDI0LjYyNCAwIDAxLTYuMTk1IDUuODA3IDI0LjEwNiAyNC4xMDYgMCAwMS03Ljg5OCAzLjI1MnY5LjgzNGgtMTIuNDY3di05LjkxMnptODYuMjYyLTU0LjQzNXYzMS4zNmMwIDMuODIxLS41NDIgNy4yMDEtMS42MjYgMTAuMTQ0LTEuMDg0IDIuOTk1LTIuNTgyIDUuNDczLTQuNDkxIDcuNDM1LTEuOTYxIDIuMDEyLTQuMzExIDMuNTYxLTcuMDQ3IDQuNjQ1LTIuODM4IDEuMDMyLTUuOTM2IDEuNTQ4LTkuMjkyIDEuNTQ4LTMuMzU0IDAtNi40NTItLjUxNi05LjI5Mi0xLjU0OC0yLjczNi0xLjA4NC01LjA4NS0yLjYzMy03LjA0Ni00LjY0NS0xLjkxLTEuOTYyLTMuNDA3LTQuNDQtNC40OTEtNy40MzUtMS4wODQtMi45NDMtMS42MjctNi4zMjMtMS42MjctMTAuMTQ0di0zMS4zNmgxMi43Nzh2MzEuMjgzYzAgNC4xMy44MjUgNy4xNzYgMi40NzcgOS4xMzcgMS42IDEuOTExIDQuMDAxIDIuODY1IDcuMjAxIDIuODY1IDMuMjAyIDAgNS42MDItLjk1NCA3LjIwMi0yLjg2NSAxLjY1Mi0xLjk2MSAyLjQ3OC01LjAwNyAyLjQ3OC05LjEzN3YtMzEuMjgzaDEyLjc3NnptNDkuNDgxIDQyLjEyNHYxMi4wNzhoLTM2LjkzNnYtNTQuMjAyaDM2LjQ3MXYxMi4wMDJoLTIzLjc3MnY5LjA2aDE4LjM1MnYxMS4zMDRoLTE4LjM1MnY5Ljc1OGgyNC4yMzd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ5LjEyNSAxMzUuNjQxbC0uMzEyLS4xNTZjMS45MjQgMCAzLjcxOC0uMzEyIDUuMzgtLjkzNiAxLjY2NC0uNjIzIDMuMDY4LTEuNTU5IDQuMjEyLTIuODA3IDEuMTQ0LTEuMjQ4IDIuMDc5LTIuODA2IDIuODA3LTQuNjc4LjY3Ni0xLjgyIDEuMDEzLTMuOTUyIDEuMDEzLTYuMzk1IDAtMi41NDgtLjMzNy00LjczMS0xLjAxMy02LjU1MS0uNzI4LTEuOTI0LTEuNjYzLTMuNTM0LTIuODA3LTQuODM0LTEuMTQ0LTEuMjk5LTIuNTQ4LTIuMzE0LTQuMjEyLTMuMDQyLTEuNTU4LS42NzYtMy4zMjYtMS4wMTMtNS4zMDEtMS4wMTNoLTguNDIzdjMwLjQxMmg4LjY1NnptLTEuMDkyLTQyLjY1M2gtLjA3N2M0LjA1NCAwIDcuNzIuNjQ5IDEwLjk5NCAxLjk0OCAzLjM4IDEuMyA2LjI2NCAzLjE3MiA4LjY1NiA1LjYxNCAyLjQ5NSAyLjQ5NiA0LjQyIDUuNDA3IDUuNzcgOC43MzQgMS40MDQgMy40MzIgMi4xMDYgNy4yIDIuMTA2IDExLjMwNiAwIDQuMDU2LS42NzUgNy43OTktMi4wMjggMTEuMjMtMS4zIDMuMzI2LTMuMTcgNi4xNjEtNS42MTQgOC41LTIuNDQzIDIuMzM4LTUuMzI4IDQuMTMyLTguNjU2IDUuMzgtMy4zMjcgMS4yNDgtNi45OTIgMS44Ny0xMC45OTUgMS44N0gyNy4zN1Y5Mi45ODhoMjAuNjY0em04NC4yMTkuMTU1djMxLjU4MWMwIDMuODQ3LS41NDYgNy4yNTItMS42MzcgMTAuMjE2LTEuMDkyIDMuMDE1LTIuNiA1LjUwOS00LjUyMyA3LjQ4NC0xLjk3NiAyLjAyOC00LjM0MSAzLjU4OC03LjA5NiA0LjY4LTIuODYgMS4wMzktNS45NzggMS41NTktOS4zNTcgMS41NTktMy4zOCAwLTYuNDk5LS41Mi05LjM1OS0xLjU1OS0yLjc1NC0xLjA5Mi01LjEyLTIuNjUyLTcuMDk2LTQuNjgtMS45MjItMS45NzUtMy40My00LjQ2OS00LjUyMi03LjQ4NC0xLjA5LTIuOTY0LTEuNjM4LTYuMzY5LTEuNjM4LTEwLjIxNlY5My4xNDNoMTIuODY3djMxLjUwMmMwIDQuMTYuODMyIDcuMjI2IDIuNDk2IDkuMjAyIDEuNjExIDEuOTI0IDQuMDI4IDIuODg1IDcuMjUyIDIuODg1IDMuMjIzIDAgNS42NC0uOTYxIDcuMjUyLTIuODg1IDEuNjYzLTEuOTc2IDIuNDk1LTUuMDQyIDIuNDk1LTkuMjAyVjkzLjE0M2gxMi44NjZ6bTc1LjA5NiAwdjEyLjA4NmgtMTUuMjA2djQyLjQ5OWgtMTIuNzg5di00Mi40OTloLTE1LjA0OVY5My4xNDNoNDMuMDQ0em0yMy4yMzcgMjUuMjY0bDcuNzk5LjE1NmMxLjAzOSAwIDEuOTc1LS4yMDggMi44MDctLjYyMmE1LjM2IDUuMzYgMCAwMDEuODctMS41NjJjLjUyLS42NzQuODg0LTEuMzc3IDEuMDkyLTIuMTA0LjI2LS44ODQuMzkxLTEuNjkuMzkxLTIuNDE4IDAtLjcyNy0uMTMxLTEuNTM0LS4zOTEtMi40MTgtLjIwOC0uNzI2LS41NzItMS40MjktMS4wOTItMi4xMDVhNS4zNCA1LjM0IDAgMDAtMS44Ny0xLjU1OWMtLjgzMi0uNDE2LTEuNzY4LS42MjQtMi44MDctLjYyNGgtNy43OTl2MTMuMjU2em0xNS4wNTEgMjkuMzk4bC05LjM1OS0xNy43aC01Ljc2OXYxNy43OGgtMTIuNzg5VjkzLjM3N2gxOS4zMzhjMy4wNjggMCA1LjkyNy40NDEgOC41NzkgMS4zMjUgMi41NDcuODMyIDQuNzI5IDIuMDc5IDYuNTQ5IDMuNzQzYTE3LjM0NSAxNy4zNDUgMCAwMTQuMjExIDUuODQ5Yy45ODggMi4xODMgMS40ODMgNC43MzEgMS40ODMgNy42NDEgMCAzLjY5Mi0uODA3IDYuODM2LTIuNDE5IDkuNDM1LTEuNjExIDIuNjUyLTMuODk5IDQuNzA1LTYuODYxIDYuMTZsMTEuMzg0IDIwLjI3NWgtMTQuMzQ3em01Mi44NzEtMjAuMTE4bC0zLjc0My0xMS44NTNjLS40MTYtMS4zNTEtLjcwMy0yLjM2NC0uODU5LTMuMDQyYTQ5LjgzMiA0OS44MzIgMCAwMC0uNzAxLTIuNjUgMzEuODk3IDMxLjg5NyAwIDAwLS4yNzMtLjk3NSA1My4yNzggNTMuMjc4IDAgMDAtLjI3Mi0uODk3bC0uMjM1LS43MDJoLS4wNzdsLS4xNTYuNzAyYy0uMDU0LjE1Ni0uMTQ0LjQ1Ni0uMjc0Ljg5Ny0uMTMuNDQxLS4yMjEuNzY3LS4yNzMuOTc1LS4wNTIuMjA4LS4xNjguNjEtLjM1MSAxLjIwOC0uMTgxLjU5Ny0uMzI1IDEuMDgtLjQyOSAxLjQ0MmwtLjkzNSAzLjA0Mi0zLjgyMSAxMS44NTNoMTIuMzk5em0zLjc0MiAxMS40NjNoLTE5LjcyOGwtMi43MjkgOC41NzdoLTEzLjU2OWwxOS41NzMtNTQuNTg0aDEzLjI1NmwxOS41NzMgNTQuNTg0aC0xMy42NDZsLTIuNzMtOC41Nzd6bTcyLjk5LTQ2LjAwN2wtMTkuMTA1IDU0LjU4NWgtMTQuNTgybC0xOC44Ny01NC41ODVoMTMuODhsOS4zNTcgMzAuMWExMDguNTEzIDEwOC41MTMgMCAwMTIuMTgzIDcuODc2Yy40NjggMi4wMjYuNzI4IDMuMDQuNzggMy4wNGguMDc4Yy4wNTIgMCAuMzEyLTEuMDE0Ljc4LTMuMDQuNTcxLTIuNDQ0IDEuMy01LjA3IDIuMTgzLTcuODc2bDkuMzU3LTMwLjFoMTMuOTU5em0zNi42NTEgMzQuNTQ0bC0zLjc0Mi0xMS44NTNjLS40MTYtMS4zNTEtLjcwMy0yLjM2NC0uODU5LTMuMDQyYTQ5LjgzMiA0OS44MzIgMCAwMC0uNzAxLTIuNjUgMzIuNjQ4IDMyLjY0OCAwIDAwLS4yNzQtLjk3NSAzOC45MyAzOC45MyAwIDAwLS4yNzItLjg5N2wtLjIzNC0uNzAyaC0uMDc4bC0uMTU2LjcwMmEyNi45NCAyNi45NCAwIDAwLS4yNzMuODk3Yy0uMTMxLjQ0MS0uMjIxLjc2Ny0uMjczLjk3NS0uMDUyLjIwOC0uMTY4LjYxLS4zNTEgMS4yMDgtLjE4MS41OTctLjMyNSAxLjA4LS40MjkgMS40NDJsLS45MzUgMy4wNDItMy44MjEgMTEuODUzaDEyLjM5OHptMy43NDMgMTEuNDYzaC0xOS43MjhsLTIuNzI5IDguNTc3aC0xMy41N2wxOS41NzQtNTQuNTg0aDEzLjI1NmwxOS41NzMgNTQuNTg0aC0xMy42NDdsLTIuNzI5LTguNTc3em0yNi4xMjQtNDYuMDA4aDEyLjc4OHY1NC41ODZoLTEyLjc4OFY5My4xNDJ6bTY0LjY0NCA0Mi40MnYxMi4xNjZoLTM2LjQxNlY5My4xNDJoMTIuNzg4djQyLjQyaDIzLjYyOHpNMzI2LjY2IDI5Ljg4M2wtLjA3Ni4yM2MtMS4xMjEtMS43MzEtMi41NzItMy4wMy00LjM1My0zLjg5Ny0xLjgzMy0uODY1LTMuNjY3LTEuMjk3LTUuNS0xLjI5Ny0zLjg2OSAwLTYuODczIDEuMzc1LTkuMDExIDQuMTI0LTIuMTM4IDIuNzUtMy4yMDggNi41MTctMy4yMDggMTEuMzA0IDAgNC44ODggMS4xNDYgOC42NTUgMy40MzggMTEuMzAzIDIuMjkgMi42NDggNS4yNjkgMy45NzIgOC45MzQgMy45NzIgMi4yOTEgMCA0LjQwNC0uNTM1IDYuMzM5LTEuNjA0IDEuODg0LTEuMDcgMy4zMzYtMi43MjYgNC4zNTMtNC45NjRsMTIuMzc0IDMuMjgyYy0xLjg4NCA0LjgzOC00Ljg2MyA4LjY4Mi04LjkzNiAxMS41MzQtMy45MjIgMi43NDktOC42NTYgNC4xMjQtMTQuMjA2IDQuMTI0LTMuNDYyIDAtNi44MjItLjYzOC0xMC4wODEtMS45MWEyMS43MTcgMjEuNzE3IDAgMDEtOC4wMTktNS42NTJjLTIuMjQxLTIuNDQ0LTMuOTk3LTUuMzcyLTUuMjctOC43ODItMS4yNzQtMy4zNi0xLjkxLTcuMTc5LTEuOTEtMTEuNDU2IDAtNC4yNzguNjM2LTguMDk2IDEuOTEtMTEuNDU2IDEuMjczLTMuNDExIDMuMDI5LTYuMzM5IDUuMjctOC43ODNhMjEuNzE3IDIxLjcxNyAwIDAxOC4wMTktNS42NTIgMjYuMTY3IDI2LjE2NyAwIDAxMTAuMDgxLTEuOTg1YzUuMTk0IDAgOS42NzQgMS4yNDggMTMuNDQyIDMuNzQyIDMuODE4IDIuNTQ2IDYuNzk3IDYuMDU5IDguOTM2IDEwLjUzOWwtMTIuNTI2IDMuMjg0em0zNy44ODMgMjEuNzY3YzIuMTM5IDIuNzUgNS4xMTggNC4xMjQgOC45MzYgNC4xMjQgMy44MTkgMCA2LjgyMy0xLjM3NCA5LjAxMi00LjEyNCAyLjE5LTIuNjk4IDMuMjg0LTYuNTE3IDMuMjg0LTExLjQ1NiAwLTQuOTktMS4wOTQtOC44MS0zLjI4NC0xMS40NTYtMi4yNC0yLjY5OC01LjI0NS00LjA0OC05LjAxMi00LjA0OC0zLjgxOCAwLTYuNzk3IDEuMzUtOC45MzYgNC4wNDgtMi4xMzggMi42NDctMy4yMDggNi40NjUtMy4yMDggMTEuNDU2IDAgNC44ODggMS4wNyA4LjcwNyAzLjIwOCAxMS40NTZ6bS0xNi4yNjgtMTEuMzAzYzAtNC4yNzcuNjM4LTguMDk2IDEuOTEtMTEuNDU3IDEuMjczLTMuNDEgMy4wMjktNi4zMzggNS4yNy04Ljc4MmEyMS43MTcgMjEuNzE3IDAgMDE4LjAxOS01LjY1MiAyNi4xOTIgMjYuMTkyIDAgMDExMC4wODEtMS45ODZjMy42MTUgMCA2Ljk3Ni42NjMgMTAuMDgyIDEuOTg2IDMuMTA1IDEuMzI0IDUuNzc4IDMuMTgyIDguMDE4IDUuNTc2IDIuMjQgMi4zOTMgNC4wMjMgNS4zMiA1LjM0NyA4Ljc4MiAxLjI3MyAzLjM2MSAxLjkwOSA3LjE3OSAxLjkwOSAxMS40NTYgMCA0LjI3Ny0uNjM2IDguMDk2LTEuOTA5IDExLjQ1Ni0xLjMyNCAzLjQ2Mi0zLjEwNyA2LjM5LTUuMzQ3IDguNzgzcy00LjkxMyA0LjI1Mi04LjAxOCA1LjU3NmMtMy4xNTggMS4yNzItNi41MTggMS45MS0xMC4wODIgMS45MS0zLjQ2MiAwLTYuODIyLS42MzgtMTAuMDgxLTEuOTFhMjEuNzE3IDIxLjcxNyAwIDAxLTguMDE5LTUuNjUyYy0yLjI0MS0yLjQ0NC0zLjk5Ny01LjM3Mi01LjI3LTguNzgzLTEuMjcyLTMuMzYtMS45MS03LjE3OC0xLjkxLTExLjQ1NnYuMTUzem04My42MzEgMTQuNzRsLS4zMDYtLjE1MmMxLjg4NCAwIDMuNjQtLjMwNyA1LjI3LS45MTggMS42MjktLjYxIDMuMDA0LTEuNTI4IDQuMTI0LTIuNzQ5IDEuMTItMS4yMjEgMi4wMzctMi43NSAyLjc0OS00LjU4My42NjMtMS43ODIuOTkzLTMuODY5Ljk5My02LjI2MiAwLTIuNDk1LS4zMy00LjYzNC0uOTkzLTYuNDE2LS43MTItMS44ODMtMS42MjktMy40NjItMi43NDktNC43MzUtMS4xMi0xLjI3Mi0yLjQ5NS0yLjI2NS00LjEyNC0yLjk3OS0xLjUyNy0uNjYxLTMuMjU5LS45OTItNS4xOTQtLjk5MmgtOC4yNDh2MjkuNzg2aDguNDc4em0tMS4wNy00MS43NzZoLS4wNzZjMy45NzEgMCA3LjU2LjYzNiAxMC43NjggMS45MDkgMy4zMSAxLjI3MiA2LjEzNiAzLjEwNSA4LjQ3OCA1LjQ5OSAyLjQ0NCAyLjQ0NCA0LjMyOCA1LjI5NCA1LjY1MiA4LjU1MyAxLjM3NCAzLjM2MSAyLjA2MiA3LjA1MiAyLjA2MiAxMS4wNzUgMCAzLjk3Mi0uNjYyIDcuNjM3LTEuOTg2IDEwLjk5Ny0xLjI3MiAzLjI1OS0zLjEwNiA2LjAzMy01LjQ5OSA4LjMyNS0yLjM5MyAyLjI5MS01LjIxOSA0LjA0OC04LjQ3NyA1LjI3LTMuMjU5IDEuMjIxLTYuODQ4IDEuODMzLTEwLjc2OCAxLjgzM2gtMjAuMzkyVjEzLjMxMWgyMC4yMzh6bTc1LjUzNiA0MS42OTl2MTEuOTE0aC0zNi40MzFWMTMuNDYyaDM1Ljk3MnYxMS44NGgtMjMuNDQ2djguOTM1aDE4LjEwMXYxMS4xNWgtMTguMTAxdjkuNjIzaDIzLjkwNXoiLz48cGF0aCBmaWxsPSIjZjY2NjYzIiBkPSJNMTM4LjY2NiAyNTcuOTU0aDUxMS4zMzN2LTk1LjczMkgxMzguNjY2djk1LjczMnptNTE4IDYuNjY3SDEzMS45OTlWMTU1LjU1Nmg1MjQuNjY3djEwOS4wNjV6Ii8+PC9zdmc+"
      />
    </a>
    <form target="_blank" action="https://code.travail.gouv.fr/recherche">
      <label for="cdtn-search">
        Trouvez les réponses à vos questions en droit du travail
      </label>
      <div id="search-bar">
        <img
          id="search-logo"
          alt="Recherche"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAoCAMAAADDs4S7AAAAw1BMVEX///////9wcMFAQKxgYLrv7/j0oKXpQEvwgIcAAJFAQK373+HlIC3hAA/sYGkQEJivr9z2sLS/v+P0n6X4wMPjEB4gIJ/f3/LucHifn9blHy3ykJb97/D5+fnm5ubg4ODz8/Ovr93a2dmcm5vBwcGQkM/t7e2ura27u7vnMDzT09P3v8MwMKWgoNbqUFpvb8F/f8ggIJ4fH55QULSAgMi/v+SPj8/f3/HPz+tQULNfX7rrUFr4v8PPz+r5z9Lzn6X2r7SE0oVPAAAAAnRSTlP/n4UHvp8AAAHaSURBVHgBvdZVgqswGIbhbyCpt6EGp+7u7rL/VZ3AuPwjTeh7gVw9aBLcswfAMP8Y43hXIPjLQlIzw38rwvGhaCz+qxJ/1oSFzyX90lL4orRPGsPnMomsP5rtQHan9yYcfFk0+M8HLQcqH7QIqJI+PEkHVFH9WgR0+btqBe2aDbqi/vfGCapUrlTz2rUaoZXrjWZWu9YitHanW9L/JBnxILuNMnraNRNE/SoGOrRhamSTn8m7xurahLO3pyPQRbOq2hQz+VMzxuYRIU8X33IhRW2Kpdys1jWLA6mZMHJL0CXUtPWmFranw8WytYIbh9qD/E6ztyvhDvubqdwJ5kC2cUCmpk2XciNqHECKzcJi5NR2goMqrfQH2Mt3g1VuRv/eXkUlbeZtd3jK/RNEDnRB9b97x3nNgVMzhk9r5A2o1Eeu/dZwv5Cd3ITFGsBqDaqYqiZ2j7vHuwT4ciI3hvX+nw4eCsdoUe+aa5drsV1KgrMJMTpq1Gy2tjiwnYWn9HJEVRPMcp+me1PbXC5nykP6balqE74a7kV4yremCHsNOb2MVNVOS+8b2bbE80f6HsNAo2YPvV2EPZ1HUvjQWUGjUMqSXbR/k7TlFr3E/qQZkR9bSIvuEvpl14f/nSicEPXggsEAAAAASUVORK5CYII="
        />
        <input
          name="q"
          autocomplete="off"
          type="text"
          id="cdtn-search"
          placeholder="période d'essai"
          aria-label="Votre recherche"
        />
        <button id="button-search">
          <svg fill="none" viewBox="0 0 32 32">
            <title>Rechercher (nouvelle fenêtre)</title>
            <path
              d="M27.319 25.368a.935.935 0 01-1.304 1.341l-6.256-6.012a9.797 9.797 0 01-6.092 2.1C8.327 22.798 4 18.59 4 13.4S8.328 4 13.667 4c5.338 0 9.666 4.208 9.666 9.399 0 2.245-.81 4.307-2.16 5.923l6.146 6.046zm-13.652-4.515c4.234 0 7.666-3.337 7.666-7.454 0-4.117-3.432-7.454-7.666-7.454C9.432 5.945 6 9.282 6 13.399c0 4.117 3.432 7.454 7.667 7.454z"
              fill="currentColor"></path>
          </svg>
        </button>
        <input type="hidden" name="source" value="widget" />
      </div>
    </form>
  </div>
`;
  setTimeout(init, 300);

  function init() {
    iframe.contentWindow.document.body.innerHTML = widget;
    const link = document.querySelector("#cdtn-widget a");
    if (link) {
      target.removeChild(link);
    }
  }
}

window.addEventListener("DOMContentLoaded", addWidget);
