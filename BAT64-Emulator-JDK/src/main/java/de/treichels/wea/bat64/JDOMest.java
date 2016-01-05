package de.treichels.wea.bat64;

import java.io.File;
import java.util.List;

import org.jdom2.Attribute;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class JDOMest {
	private static void indent(final int indent) {
		int count = indent;
		while (count-- > 0) {
			System.out.print("   ");
		}
	}

	public static void main(final String[] args) throws Exception {
		final File file = new File(args[0]);

		final SAXBuilder builder = new SAXBuilder();
		final Document doc = builder.build(file);
		printElement(doc.getRootElement(), 0);

		final XMLOutputter outputter = new XMLOutputter(Format.getPrettyFormat());
		outputter.output(doc, System.out);
	}

	private static void printElement(final Element element, final int indent) {
		indent(indent);
		System.out.printf("<%s", element.getName());

		for (final Attribute a : element.getAttributes()) {
			System.out.printf(" %s=\"%s\"", a.getName(), a.getValue());
		}

		final String text = element.getText().trim();
		if (text.length() > 0) {
			System.out.printf(">%s</%s>\n", text, element.getName());
		} else {
			final List<Element> children = element.getChildren();
			if (children.size() == 0) {
				System.out.println("/>");
			} else {
				System.out.println(">");
				for (final Element child : children) {
					printElement(child, indent + 1);
				}
				indent(indent);
				System.out.printf("</%s>\n", element.getName());
			}
		}
	}
}