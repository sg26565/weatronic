package de.treichels.wea.bat64.config;

import java.util.regex.Pattern;

import org.simpleframework.xml.stream.Style;

public class MyStyle implements Style {
	private final Pattern namedGroupPattern = Pattern.compile(".*\\__[0-9][0-9]");

	@Override
	public String getAttribute(final String name) {
		return name;
	}

	@Override
	public String getElement(final String name) {
		if (namedGroupPattern.matcher(name).matches()) {
			return "NamedConfigListEntry";
		}
		return name;
	}
}
