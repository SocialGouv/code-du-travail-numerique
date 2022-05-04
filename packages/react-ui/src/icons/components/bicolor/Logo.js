import * as React from "react";
import { memo } from "react";

const SvgLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 657 265"
    aria-label="Code du travail numérique"
    {...props}
  >
    <path fill="#fff" d="M135 160h520v100H135z" />
    <path
      fill="currentColor"
      d="M533.026 159.16H.822V79.824h532.204v79.336zm-.107-79.336H264.98V.488h267.939v79.336zM210.09 186.329l-.155 54.359h-11.616l-10.685-16.339c-.155-.259-1.316-1.936-3.484-5.034-.568-.826-1.677-2.503-3.329-5.033a99.201 99.201 0 0 0-2.556-3.793l-1.007-1.551h-.155l.078 1.396c.052.362.09 1.007.116 1.936.026.928.038 1.624.038 2.09.104 1.754.182 3.846.232 6.271.052 1.602.079 4.259.079 7.976v11.924h-12.623v-54.124h11.616l11.304 17.113 2.788 4.181c.104.154 1.162 1.704 3.175 4.645.259.414.672 1.046 1.239 1.898a44.728 44.728 0 0 0 1.317 1.897l1.084 1.548h.077v-5.652c0-2.477-.026-4.491-.077-6.04-.052-1.548-.077-3.975-.077-7.279v-12.389h12.621zm57.38 0v31.36c0 3.821-.543 7.201-1.627 10.144-1.084 2.995-2.581 5.473-4.491 7.435-1.961 2.012-4.31 3.561-7.046 4.645-2.839 1.032-5.936 1.548-9.292 1.548-3.355 0-6.452-.516-9.292-1.548-2.736-1.084-5.086-2.633-7.047-4.645-1.909-1.962-3.407-4.44-4.491-7.435-1.084-2.943-1.626-6.323-1.626-10.144v-31.36h12.777v31.283c0 4.13.825 7.176 2.477 9.137 1.6 1.911 4.002 2.865 7.202 2.865 3.201 0 5.601-.954 7.201-2.865 1.652-1.961 2.477-5.007 2.477-9.137v-31.283h12.778zm63.186 0-.155 54.359h-12.389v-14.326c0-5.627.128-10.196.387-13.706.052-1.031.104-1.91.154-2.632.052-.723.078-1.264.078-1.626v-.542h-.078l-.618 1.082c-.516.93-.956 1.757-1.318 2.48l-1.393 2.787-1.007 2.013-5.885 10.996h-6.427l-5.885-10.996a27.177 27.177 0 0 0-.929-2.013l-1.394-2.787a65.57 65.57 0 0 0-1.316-2.48l-.62-1.082h-.154c-.052 0-.052.388 0 1.161s.129 1.963.232 3.561c.258 3.511.388 8.08.388 13.707v14.324h-12.312v-54.124h11.924l9.292 16.415c1.652 2.994 2.736 5.137 3.253 6.428.464 1.238.723 1.858.773 1.858h.078l.154-.467c.052-.102.259-.591.62-1.469.414-.929.827-1.808 1.239-2.633a47.654 47.654 0 0 1 2.091-3.872l9.292-16.416h11.925zm27.181-2.246-3.872-6.736 17.268-9.756 4.569 8.593-17.965 7.899zm23.074 44.369v12.08h-36.934v-54.204h36.47v12.004h-23.772v9.059h18.352v11.305h-18.352v9.756h24.236zm25.323-17.035 7.744.155c1.032 0 1.961-.207 2.787-.619a5.35 5.35 0 0 0 1.858-1.549c.516-.671.878-1.368 1.084-2.091.259-.877.387-1.678.387-2.401 0-.723-.128-1.523-.387-2.4-.206-.723-.568-1.42-1.084-2.091a5.33 5.33 0 0 0-1.858-1.549c-.826-.412-1.755-.619-2.787-.619h-7.744v13.164zm14.945 29.192-9.292-17.577h-5.73v17.655h-12.699v-54.126h19.203c3.046 0 5.885.439 8.518 1.316 2.53.827 4.698 2.066 6.504 3.718a17.238 17.238 0 0 1 4.182 5.808c.98 2.166 1.47 4.696 1.47 7.588 0 3.665-.8 6.788-2.4 9.369-1.6 2.632-3.872 4.672-6.813 6.117l11.304 20.132h-14.247zm23.928-54.28h12.699v54.203h-12.699v-54.203zm57.689 38.639c2.22-2.736 3.329-6.608 3.329-11.614 0-5.059-1.109-8.931-3.329-11.616-2.272-2.735-5.318-4.103-9.138-4.103-3.872 0-6.892 1.368-9.06 4.103-2.168 2.736-3.252 6.608-3.252 11.616 0 4.956 1.084 8.828 3.252 11.614 2.168 2.787 5.188 4.182 9.06 4.182 3.82 0 6.866-1.395 9.138-4.182zm-15.487 15.796-.077.311c-2.736-.568-5.37-1.679-7.899-3.329-2.323-1.498-4.361-3.486-6.117-5.963-1.704-2.427-3.02-5.137-3.95-8.132-.928-2.993-1.393-6.323-1.393-9.988 0-4.336.645-8.208 1.936-11.615 1.291-3.458 3.072-6.426 5.343-8.905a21.995 21.995 0 0 1 8.13-5.729 26.519 26.519 0 0 1 10.222-2.014c3.665 0 7.072.671 10.221 2.014 3.149 1.342 5.859 3.226 8.131 5.652 2.27 2.426 4.077 5.394 5.42 8.904 1.29 3.408 1.936 7.28 1.936 11.616 0 3.613-.466 6.969-1.395 10.065-.929 3.097-2.245 5.808-3.948 8.132a24.624 24.624 0 0 1-6.195 5.807 24.106 24.106 0 0 1-7.898 3.252v9.834h-12.467v-9.912zm86.262-54.435v31.36c0 3.821-.542 7.201-1.626 10.144-1.084 2.995-2.582 5.473-4.491 7.435-1.961 2.012-4.311 3.561-7.047 4.645-2.838 1.032-5.936 1.548-9.292 1.548-3.354 0-6.452-.516-9.292-1.548-2.736-1.084-5.085-2.633-7.046-4.645-1.91-1.962-3.407-4.44-4.491-7.435-1.084-2.943-1.627-6.323-1.627-10.144v-31.36h12.778v31.283c0 4.13.825 7.176 2.477 9.137 1.6 1.911 4.001 2.865 7.201 2.865 3.202 0 5.602-.954 7.202-2.865 1.652-1.961 2.478-5.007 2.478-9.137v-31.283h12.776zm49.481 42.124v12.078h-36.936v-54.202h36.471v12.002h-23.772v9.06h18.352v11.304h-18.352v9.758h24.237z"
    />
    <path
      fill="#fff"
      d="m49.125 135.641-.312-.156c1.924 0 3.718-.312 5.38-.936 1.664-.623 3.068-1.559 4.212-2.807 1.144-1.248 2.079-2.806 2.807-4.678.676-1.82 1.013-3.952 1.013-6.395 0-2.548-.337-4.731-1.013-6.551-.728-1.924-1.663-3.534-2.807-4.834-1.144-1.299-2.548-2.314-4.212-3.042-1.558-.676-3.326-1.013-5.301-1.013h-8.423v30.412h8.656zm-1.092-42.653h-.077c4.054 0 7.72.649 10.994 1.948 3.38 1.3 6.264 3.172 8.656 5.614 2.495 2.496 4.42 5.407 5.77 8.734 1.404 3.432 2.106 7.2 2.106 11.306 0 4.056-.675 7.799-2.028 11.23-1.3 3.326-3.17 6.161-5.614 8.5-2.443 2.338-5.328 4.132-8.656 5.38-3.327 1.248-6.992 1.87-10.995 1.87H27.37V92.988h20.664zm84.219.155v31.581c0 3.847-.546 7.252-1.637 10.216-1.092 3.015-2.6 5.509-4.523 7.484-1.976 2.028-4.341 3.588-7.096 4.68-2.86 1.039-5.978 1.559-9.357 1.559-3.38 0-6.499-.52-9.359-1.559-2.754-1.092-5.12-2.652-7.096-4.68-1.922-1.975-3.43-4.469-4.522-7.484-1.09-2.964-1.638-6.369-1.638-10.216V93.143h12.867v31.502c0 4.16.832 7.226 2.496 9.202 1.611 1.924 4.028 2.885 7.252 2.885 3.223 0 5.64-.961 7.252-2.885 1.663-1.976 2.495-5.042 2.495-9.202V93.143h12.866zm75.096 0v12.086h-15.206v42.499h-12.789v-42.499h-15.049V93.143h43.044zm23.237 25.264 7.799.156c1.039 0 1.975-.208 2.807-.622a5.36 5.36 0 0 0 1.87-1.562c.52-.674.884-1.377 1.092-2.104.26-.884.391-1.69.391-2.418 0-.727-.131-1.534-.391-2.418-.208-.726-.572-1.429-1.092-2.105a5.34 5.34 0 0 0-1.87-1.559c-.832-.416-1.768-.624-2.807-.624h-7.799v13.256zm15.051 29.398-9.359-17.7h-5.769v17.78h-12.789V93.377h19.338c3.068 0 5.927.441 8.579 1.325 2.547.832 4.729 2.079 6.549 3.743a17.345 17.345 0 0 1 4.211 5.849c.988 2.183 1.483 4.731 1.483 7.641 0 3.692-.807 6.836-2.419 9.435-1.611 2.652-3.899 4.705-6.861 6.16l11.384 20.275h-14.347zm52.871-20.118-3.743-11.853c-.416-1.351-.703-2.364-.859-3.042a49.832 49.832 0 0 0-.701-2.65 31.897 31.897 0 0 0-.273-.975 53.278 53.278 0 0 0-.272-.897l-.235-.702h-.077l-.156.702c-.054.156-.144.456-.274.897-.13.441-.221.767-.273.975-.052.208-.168.61-.351 1.208-.181.597-.325 1.08-.429 1.442l-.935 3.042-3.821 11.853h12.399zm3.742 11.463h-19.728l-2.729 8.577h-13.569l19.573-54.584h13.256l19.573 54.584h-13.646l-2.73-8.577zm72.99-46.007-19.105 54.585h-14.582l-18.87-54.585h13.88l9.357 30.1a108.513 108.513 0 0 1 2.183 7.876c.468 2.026.728 3.04.78 3.04h.078c.052 0 .312-1.014.78-3.04.571-2.444 1.3-5.07 2.183-7.876l9.357-30.1h13.959zm36.651 34.544-3.742-11.853c-.416-1.351-.703-2.364-.859-3.042a49.832 49.832 0 0 0-.701-2.65 32.648 32.648 0 0 0-.274-.975 38.93 38.93 0 0 0-.272-.897l-.234-.702h-.078l-.156.702a26.94 26.94 0 0 0-.273.897c-.131.441-.221.767-.273.975-.052.208-.168.61-.351 1.208-.181.597-.325 1.08-.429 1.442l-.935 3.042-3.821 11.853h12.398zm3.743 11.463h-19.728l-2.729 8.577h-13.57l19.574-54.584h13.256l19.573 54.584h-13.647l-2.729-8.577zm26.124-46.008h12.788v54.586h-12.788V93.142zm64.644 42.42v12.166h-36.416V93.142h12.788v42.42h23.628zM326.66 29.883l-.076.23c-1.121-1.731-2.572-3.03-4.353-3.897-1.833-.865-3.667-1.297-5.5-1.297-3.869 0-6.873 1.375-9.011 4.124-2.138 2.75-3.208 6.517-3.208 11.304 0 4.888 1.146 8.655 3.438 11.303 2.29 2.648 5.269 3.972 8.934 3.972 2.291 0 4.404-.535 6.339-1.604 1.884-1.07 3.336-2.726 4.353-4.964l12.374 3.282c-1.884 4.838-4.863 8.682-8.936 11.534-3.922 2.749-8.656 4.124-14.206 4.124-3.462 0-6.822-.638-10.081-1.91a21.717 21.717 0 0 1-8.019-5.652c-2.241-2.444-3.997-5.372-5.27-8.782-1.274-3.36-1.91-7.179-1.91-11.456 0-4.278.636-8.096 1.91-11.456 1.273-3.411 3.029-6.339 5.27-8.783a21.717 21.717 0 0 1 8.019-5.652 26.167 26.167 0 0 1 10.081-1.985c5.194 0 9.674 1.248 13.442 3.742 3.818 2.546 6.797 6.059 8.936 10.539l-12.526 3.284zm37.883 21.767c2.139 2.75 5.118 4.124 8.936 4.124 3.819 0 6.823-1.374 9.012-4.124 2.19-2.698 3.284-6.517 3.284-11.456 0-4.99-1.094-8.81-3.284-11.456-2.24-2.698-5.245-4.048-9.012-4.048-3.818 0-6.797 1.35-8.936 4.048-2.138 2.647-3.208 6.465-3.208 11.456 0 4.888 1.07 8.707 3.208 11.456zm-16.268-11.303c0-4.277.638-8.096 1.91-11.457 1.273-3.41 3.029-6.338 5.27-8.782a21.717 21.717 0 0 1 8.019-5.652 26.192 26.192 0 0 1 10.081-1.986c3.615 0 6.976.663 10.082 1.986 3.105 1.324 5.778 3.182 8.018 5.576 2.24 2.393 4.023 5.32 5.347 8.782 1.273 3.361 1.909 7.179 1.909 11.456 0 4.277-.636 8.096-1.909 11.456-1.324 3.462-3.107 6.39-5.347 8.783s-4.913 4.252-8.018 5.576c-3.158 1.272-6.518 1.91-10.082 1.91-3.462 0-6.822-.638-10.081-1.91a21.717 21.717 0 0 1-8.019-5.652c-2.241-2.444-3.997-5.372-5.27-8.783-1.272-3.36-1.91-7.178-1.91-11.456v.153zm83.631 14.74-.306-.152c1.884 0 3.64-.307 5.27-.918 1.629-.61 3.004-1.528 4.124-2.749 1.12-1.221 2.037-2.75 2.749-4.583.663-1.782.993-3.869.993-6.262 0-2.495-.33-4.634-.993-6.416-.712-1.883-1.629-3.462-2.749-4.735-1.12-1.272-2.495-2.265-4.124-2.979-1.527-.661-3.259-.992-5.194-.992h-8.248v29.786h8.478zm-1.07-41.776h-.076c3.971 0 7.56.636 10.768 1.909 3.31 1.272 6.136 3.105 8.478 5.499 2.444 2.444 4.328 5.294 5.652 8.553 1.374 3.361 2.062 7.052 2.062 11.075 0 3.972-.662 7.637-1.986 10.997-1.272 3.259-3.106 6.033-5.499 8.325-2.393 2.291-5.219 4.048-8.477 5.27-3.259 1.221-6.848 1.833-10.768 1.833h-20.392V13.311h20.238zm75.536 41.699v11.914h-36.431V13.462h35.972v11.84h-23.446v8.935h18.101v11.15h-18.101v9.623h23.905z"
    />
    <path
      fill="currentColor"
      d="M138.666 257.954h511.333v-95.732H138.666v95.732zm518 6.667H131.999V155.556h524.667v109.065z"
    />
  </svg>
);

const Memo = memo(SvgLogo);
export default Memo;
