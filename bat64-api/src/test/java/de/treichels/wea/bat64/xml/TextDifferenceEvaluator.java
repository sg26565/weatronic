package de.treichels.wea.bat64.xml;

import org.w3c.dom.Node;
import org.w3c.dom.Text;
import org.xmlunit.diff.Comparison;
import org.xmlunit.diff.ComparisonResult;
import org.xmlunit.diff.DifferenceEvaluator;

public class TextDifferenceEvaluator implements DifferenceEvaluator {
	@Override
	public ComparisonResult evaluate(final Comparison comparison, final ComparisonResult outcome) {
		if (outcome == ComparisonResult.EQUAL) {
			return outcome; // only evaluate differences.
		}

		final Node controlNode = comparison.getControlDetails().getTarget();
		final Node testNode = comparison.getTestDetails().getTarget();

		if (controlNode instanceof Text && testNode instanceof Text) {
			final String controlText = controlNode.getTextContent();
			final String testText = controlNode.getTextContent();

			if (controlText.contains(",") && testText.contains(",")) {
				final String t1 = controlText.replaceAll(" ", "");
				final String t2 = testText.replaceAll(" ", "");

				if (t1.equals(t2)) {
					return ComparisonResult.SIMILAR;
				}
			}
		}

		return outcome;
	}
}
