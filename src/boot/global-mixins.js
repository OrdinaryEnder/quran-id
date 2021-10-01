import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;
import packageInfo from "../../package.json";

export default ({ app }) => {
  app.mixin({
    data() {
      return {
        basmalahArabic: "﷽",
        productName: packageInfo.productName,
        productDescription: packageInfo.description,
      };
    },
    methods: {
      removeFootNote(str) {
        const regExp = /<sup\s+foot_note=\d+>\d+<\/sup>/gi;
        return str.replaceAll(regExp, "");
      },
      scrollToElement(el, offsetCorrection = -66, duration = 1000) {
        // 66 is toolbar height
        const target = getScrollTarget(el);
        const offset = el.offsetTop + offsetCorrection;
        setScrollPosition(target, offset, duration);
      },
      normalizeSurahNameTranslation(str) {
        return str.replace(/\\/g, "");
      },
      arabicNumber(number) {
        const arabicNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
        const frame = "&#1757;";
        return (
          frame +
          number
            .toString()
            .split("")
            .map((num) => arabicNums[num])
            .join("")
        );
      },
      track(title, path, loc) {
        const page_title = title;
        const page_path = path ?? window.location.pathname;
        const page_location = loc ?? window.location.href;
        this.$gtag.pageview({ page_title, page_path, page_location });
      },
    },
  });
};
